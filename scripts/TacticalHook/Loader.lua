-- Variables
local config = getgenv().TactHook
local UserInputService = game:GetService("UserInputService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local StarterGui = game:GetService("StarterGui")
local TweenService = game:GetService("TweenService")
local player = Players.LocalPlayer
local mouse = player:GetMouse()
local camLockEnabled = false -- keep this false
local target
local fovCircle = Drawing.new("Circle")
fovCircle.Position = Vector2.new(mouse.X, mouse.Y)
fovCircle.Radius = config.Fov.FOVRadius
fovCircle.Filled = false
fovCircle.Color = Color3.fromRGB(0, 0, 0)
fovCircle.Thickness = 2
fovCircle.Visible = config.Fov.Visible

-- Timestamp to control response time
local lastToggleTime = 0

-- Functions
local function getClosestTarget()
    local closestTarget = nil
    local shortestDistance = config.Fov.FOVRadius

    for _, otherPlayer in pairs(Players:GetPlayers()) do
        if otherPlayer ~= player and otherPlayer.Character and otherPlayer.Character:FindFirstChild("HumanoidRootPart") then
            local targetPart = otherPlayer.Character.HumanoidRootPart
            local screenPoint = workspace.CurrentCamera:WorldToScreenPoint(targetPart.Position)
            local distance = (Vector2.new(screenPoint.X, screenPoint.Y) - Vector2.new(mouse.X, mouse.Y)).magnitude

            if distance < config.Aiming.TargettingRadius and distance < shortestDistance then
                closestTarget = targetPart
                shortestDistance = distance
            end
        end
    end

    return closestTarget
end

local function advancedPredictTargetPosition(targetPart, deltaTime)
    local targetVelocity = targetPart.Velocity
    local targetPosition = targetPart.Position
    local acceleration = (targetVelocity - (targetPart.Velocity - targetPart.AssemblyLinearVelocity * deltaTime)) / deltaTime
    local predictedPosition = targetPosition + targetVelocity * config.Aiming.PredictionTime + 0.5 * acceleration * config.Aiming.PredictionTime ^ 2

    -- Check if predicted position is below ground threshold
    local ray = Ray.new(predictedPosition, Vector3.new(0, -1, 0) * config.Aiming.GroundCheckThreshold)
    local hitPart, hitPos = workspace:FindPartOnRay(ray)
    if hitPart then
        predictedPosition = hitPos
    end

    return predictedPosition
end

local function toggleCamLock()
    local currentTime = tick()
    if currentTime - lastToggleTime >= config.Aiming.ResponseTime then
        camLockEnabled = not camLockEnabled
        if camLockEnabled then
            target = getClosestTarget()
            displayNotification("Lock ON")
        else
            target = nil
            displayNotification("Lock OFF")
        end
        lastToggleTime = currentTime
    end
end

local function smartFlick()
    if camLockEnabled and target then
        local camera = workspace.CurrentCamera
        local predictedPosition = target.Position -- Directly using the target's position for flick
        camera.CFrame = CFrame.new(camera.CFrame.Position, predictedPosition)
    end
end

local lastJumpTime = 0
local lastKnownPosition = nil

-- Importing necessary modules
local StarterGui = game:GetService("StarterGui")

local function onInputBegan(input, gameProcessed)
    if input.KeyCode == Enum.KeyCode.E and not gameProcessed then -- Toggle aimlock
        toggleCamLock()
    elseif input.KeyCode == Enum.KeyCode.Q and not gameProcessed then -- Smart flick
        smartFlick()
    elseif input.KeyCode == Enum.KeyCode.C and not gameProcessed then -- Toggle Enabled
        config.TriggerBot.Enabled = not config.TriggerBot.Enabled
        displayNotification("Enabled " .. (config.TriggerBot.Enabled and "ON" or "OFF"))
    end
end

local function onRenderStep(deltaTime)
    if camLockEnabled then
        local camera = workspace.CurrentCamera
        local cameraPos = camera.CFrame.Position

        -- Check if there's a target and if they're in the air
        if target and target:IsDescendantOf(workspace) then
            local targetCharacter = target.Parent
            local humanoid = targetCharacter:FindFirstChildOfClass("Humanoid")

            if humanoid and humanoid:GetState() == Enum.HumanoidStateType.Jumping then
                if tick() - lastJumpTime < config.Predicting.JumpPredictionDelay then
                    if lastKnownPosition then
                        local targetCFrame = CFrame.new(cameraPos, lastKnownPosition)
                        camera.CFrame = camera.CFrame:Lerp(targetCFrame, config.Aiming.Smoothness)
                    end
                    return
                else
                    lastJumpTime = tick()
                    lastKnownPosition = target.Position
                end
            end

            local predictedPosition = advancedPredictTargetPosition(target, deltaTime)
            local targetCFrame = CFrame.new(cameraPos, predictedPosition)

            -- Apply smooth movement with randomness
            local distanceToTarget = (predictedPosition - cameraPos).magnitude
            local interpolationFactor = math.clamp(distanceToTarget / config.Predicting.TargettingDistance, config.Predicting.MinSmoothnessInterpolation, config.Predicting.MaxSmoothnessInterpolation)
            local currentSmoothness = config.Aiming.Smoothness + (config.Aiming.SmoothnessSpeed - config.Aiming.Smoothness) * interpolationFactor

            -- Introduce randomness to make aim appear more human-like
            local randomOffset = Vector3.new(
                math.random() * config.Predicting.RandomShotsAmount - config.Predicting.RandomShotsAmount / 2,
                math.random() * config.Predicting.RandomShotsAmount - config.Predicting.RandomShotsAmount / 2,
                math.random() * config.Predicting.RandomShotsAmount - config.Predicting.RandomShotsAmount / 2
            )
            targetCFrame = targetCFrame * CFrame.new(randomOffset)

            -- Apply camera shake
            local shakeOffset = Vector3.new(
                math.random(-config.Aiming.ShakeAmount, config.Aiming.ShakeAmount) * deltaTime,
                math.random(-config.Aiming.ShakeAmount, config.Aiming.ShakeAmount) * deltaTime,
                math.random(-config.Aiming.ShakeAmount, config.Aiming.ShakeAmount) * deltaTime
            )
            targetCFrame = targetCFrame * CFrame.new(shakeOffset)

            -- Less smooth camera movement towards predicted position
            camera.CFrame = camera.CFrame:Lerp(targetCFrame, currentSmoothness)
        end
    end

    if config.TriggerBot.Enabled and target then
        local character = player.Character
        if character then
            local humanoid = character:FindFirstChildOfClass("Humanoid")
            if humanoid and humanoid.Health > 0 then
                local crosshairTarget = mouse.Target
                if crosshairTarget and crosshairTarget:IsDescendantOf(target.Parent) then
                    mouse1press()
                    wait(0.1)
                    mouse1release()
                end
            end
        end
    end
end

-- Function to display notification
local function displayNotification(message)
    StarterGui:SetCore("SendNotification", {
        Title = "STATUS",
        Text = message,
        Duration = 20
    })
end

-- Function to update FOV circle
local function updateFovCircle()
    fovCircle.Position = Vector2.new(mouse.X, mouse.Y)
end

displayNotification("HALALGAMING ON TOP")
displayNotification("SCRIPT is still in beta")
displayNotification("Lock = E")
displayNotification("Flick = Q")
displayNotification("Enabled = C")

-- Event connections
UserInputService.InputBegan:Connect(onInputBegan)
RunService.RenderStepped:Connect(onRenderStep)
RunService.RenderStepped:Connect(updateFovCircle)
