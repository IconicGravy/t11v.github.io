--[[
                                                                                                          The 11 View
LuaSec V11's anti debugging Utility
Deleted stuff:
  1) API endpoints
  2) clinet relations (to make it standalone)
  3) V12 Addons 
Features:
  1) Function Protection 
  2) Silent Operation 
  3) Automatic Setup 
  4) Debug Function Replacement 
  5) Anti-Stack Inspection 
  6) Hook Detection 
  7) Silent Blocking 
  8) Zero Configuration 
  9) Lightweight 
  10) Universal Compatibility 
  11) Function Identity Protection 
  12) Runtime Monitoring 
  13) No Dependencies 
More features but these are the most important

This is not the version used in the V12 please note that the current version of LuaSec is V12.4 (That doesn't mean this is outdated)

Contact me @p2w8 on discord (for questions)

Warning:
If you're thinking about using this, do these two things or just don't bother:

1) Rename everything
Variables, functions, whatever. Obfuscators sometimes do their own renaming depending on the VM, but some of the obfuscators encode names using XOR or arithmetic and then decode them at runtime. Anyone with memory access (executors) can read the original names directly.

2) Obfuscate your version
This module is open source. That means anyone can see the security checks. Attackers / Exploiters will either hook everything or just bypass it without triggering any checks.

In simple words: rename it, obfuscate it, and please don't be the guy who leaves the door open for attackers / exploiters and then blame the security.
]]

-- Handler for environments without warn function
if not warn then
    function warn(...)
        print("Warning:", ...)
    end
end

local LuaSec = {
    enabled = true,
    checkInterval = 12,
    maxStackDepth = 4,
    kickOnDetect = true,
    running = false,
    original = {},
    protected = {},
    protectedCount = 0,
    suspiciousCount = 0,
    lastCheckTime = 0,
    lastCheckResult = false,
    responseMethods = {"kick", "degrade", "delay"},
    currentMethod = 1,
    status = "Initialized",
    debugFunctionsReadOnly = false
}

-- Utility if the running env doesn't have spawn (e.g Lua Compilers)
local function Spawn(f)
    if spawn then
        spawn(f)
    elseif coroutine and coroutine.wrap then
        local co = coroutine.wrap(f)
        co()
    else
        f()
    end
end

local function makeFakeInfo(what)
    local names = {"update", "render", "process", "handle", "callback", "refresh", "load"} -- Fake response names
    local sources = {"Player", "Replicated", "Starter", "Server", "Storage", "Scripts"} -- Fake globals
    
    local replace = {}
    
    if what:find("n") then
        replace.name = names[math.random(1, #names)] .. "_" .. math.random(100, 999)
    end
    -- API Related
    if what:find("S") then
        -- Normally this should reply with the raw version of the script (If the owner is willing to use luasec's API for hosting)
        -- Endpoint: /api/scripts/:scriptId/raw 
        replace.source = sources[math.random(1, #sources)] .. "/Script_" .. math.random(10, 99) .. ".lua"
    end
    
    if what:find("l") then
        replace.currentline = math.random(5, 200)
    end
    
    if what:find("L") then
        replace.activelines = {}
        for i = 1, math.random(3, 5) do
            replace.activelines[i] = math.random(5, 200)
        end
    end
    
    return replace
end

local function performStackCheck()
    local depth = 0
    local limit = 0
    
    while depth < LuaSec.maxStackDepth do
        depth = depth + 1
        local info = LuaSec.original.debugGetInfo and LuaSec.original.debugGetInfo(depth, "S")
        
        if not info then break end
        
        if info.source and (
            info.source:lower():find("debug") or
            info.source:lower():find("hook") or
            info.source:lower():find("inspect") or
            info.source:lower():find("trace") or
            info.source:lower():find("monitor")
        ) then
            limit = limit + 1
        end
    end
    
    return limit >= 2
end

-- Tries to catch debuggers by checking for suspicious globals and timing a small math loop (slow = probably being debugged)
local function checkEnvironment()
    if _G.__DEBUG_ENABLED or _G.__INSPECTOR then
        return true
    end
    
    local start = os.clock()
    for i = 1, 1000 do math.sqrt(i) end
    return (os.clock() - start) > 0.001
end

-- Rate-limited coordinator
local function checkDebugActivity()
    if LuaSec.lastCheckTime and (os.clock() - LuaSec.lastCheckTime) < 0.1 then
        return LuaSec.lastCheckResult
    end
    
    local stackResult = performStackCheck()
    local envResult = checkEnvironment()
    local result = stackResult or envResult
    
    LuaSec.lastCheckTime = os.clock()
    LuaSec.lastCheckResult = result
    
    return result
end

local function debugHook()
    if checkDebugActivity() then
        LuaSec.suspiciousCount = LuaSec.suspiciousCount + 1
        if LuaSec.suspiciousCount >= 3 then
            LuaSec:handleDetection()
        end
    end
    
    if LuaSec.debugFunctionsReadOnly then
        local caller = LuaSec.original.debugGetInfo and LuaSec.original.debugGetInfo(2, "f")
        if caller and (
            caller.func == LuaSec.original.debugInfo or 
            caller.func == LuaSec.original.debugGetInfo
        ) then
            LuaSec:handleDetection()
        end
    end
end

function LuaSec:start()
    if not self.enabled or self.running then return end
    
    self.status = "Starting"
    
    if debug then
        self.original.debugInfo = debug.info
        self.original.debugGetInfo = debug.getinfo
        self.original.debugSetHook = debug.sethook
        self.original.debugGetUpvalue = debug.getupvalue
        self.original.debugSetUpvalue = debug.setupvalue
    end
    
    local success, err = pcall(function()
        if debug then
            debug.info = function(...)
                if checkDebugActivity() then
                    self:handleDetection()
                end
                
                local args = {...}
                local what = args[2] or "n"
                return makeFakeInfo(what)
            end
            
            debug.getinfo = function(func, what)
                -- Check if this is a protected function
                for name, data in pairs(self.protected) do
                    if func == data.safe then
                        -- Return fake info
                        return makeFakeInfo(what or "f")
                    end
                end
                
                if checkDebugActivity() then
                    self:handleDetection()
                end
                
                return self.original.debugGetInfo(func, what)
            end
            
            debug.sethook = function() end
            
            -- Protect upvalues of protected functions
            debug.getupvalue = function(func, index)
                -- Check if this is a protected function
                for name, data in pairs(self.protected) do
                    if func == data.safe then
                        -- Return fake or no upvalues
                        if index == 1 then
                            return nil, nil
                        else
                            return nil
                        end
                    end
                end
                
                return self.original.debugGetUpvalue(func, index)
            end
            
            debug.setupvalue = function(func, index, value)
                -- Check if this is a protected function
                for name, data in pairs(self.protected) do
                    if func == data.safe then
                        -- Don't allow modification
                        return false
                    end
                end
                
                return self.original.debugSetUpvalue(func, index, value)
            end
        end
    end)
    
    -- If it can't replace the debug functions, it will rely on the hook for detection
    if not success then
        self.debugFunctionsReadOnly = true
        self.status = "Debug functions read-only, using hook detection"
    else
        self.status = "Debug functions replaced"
    end
    
    if self.original.debugSetHook then
        self.original.debugSetHook(debugHook, "c")
        self.status = self.status .. " | Hook set"
    end
    
    -- Use Spawn instead of spawn/coroutine.wrap directly
    Spawn(function()
        local selfRef = self  -- Capture self for the closure
        while selfRef.running do
            -- Fix: Ensure wait exists before using it
            if wait then
                wait(selfRef.checkInterval)
            else
                -- Fallback for environments without wait
                local start = os.clock()
                while os.clock() - start < selfRef.checkInterval do end
            end
            selfRef:checkSystem()
        end
    end)
    
    self.running = true
    self.status = self.status .. " | Running"
end

function LuaSec:checkSystem()
    if debug then
        local testFunc = function() return 42 end
        local testInfo = debug.getinfo(testFunc)
        if not testInfo or testInfo.name ~= "testFunc" then
            self:handleDetection()
        end
    end
    
    local hookStatus = self.original.debugGetHook and self.original.debugGetHook()
    if hookStatus and hookStatus ~= debugHook then
        self:handleDetection()
    end
    
    if math.random(1, 5) == 1 then
        self.suspiciousCount = 0
    end
    
    if math.random(1, 10) == 1 then
        self.currentMethod = math.random(1, #self.responseMethods)
    end
end

function LuaSec:handleDetection()
    if not self.kickOnDetect then return end
    
    self.status = "Debug activity detected!"
    
    local method = self.responseMethods[self.currentMethod]
    
    if method == "kick" then
        -- Kicks the player (if in roblox client)
        if game and game.Players and game.Players.LocalPlayer then
            game.Players.LocalPlayer:Kick("Security violation detected")
        end
        -- Super optimized mode (For Roblox studio)
    elseif method == "degrade" then
        debug = nil
        collectgarbage("count")
    else
        -- Bloats the script with loop :P
        Spawn(function()
            -- Ensure wait exists before using it
            if wait then
                wait(math.random(1, 5))
            else -- For environments without wait (e.g Lua Compilers)
                local start = os.clock()
                while os.clock() - start < math.random(1, 5) do end
            end
            while true do end
        end)
    end
end

function LuaSec:protect(func, name)
    if not self.enabled or not self.running then return func end
    
    local safeFunc = function(...)
        if checkDebugActivity() then
            self:handleDetection()
        end
        
        return func(...)
    end
    
    -- Store protected function with secure reference
    self.protected[name] = {
        original = nil,  -- Don't store original directly
        safe = safeFunc,
        -- Use a closure to reference the original without exposing it
        call = function(...)
            return func(...)
        end
    }
    
    -- Increment the protected functions counter
    self.protectedCount = self.protectedCount + 1
    
    return safeFunc
end

LuaSec:start()

-- Create a protected function
local luasec = LuaSec:protect(function()
    print("LuaSec is so lightweight")
    print("Current status:", LuaSec.status)
    print("Protected functions count:", LuaSec.protectedCount) 
end, "luasec")

local success, err = pcall(function()
    _G.luasec = luasec
end)

if not success then
    warn("Could not set global luasec:", err)
end

LuaSec.luasec = luasec

return LuaSec
