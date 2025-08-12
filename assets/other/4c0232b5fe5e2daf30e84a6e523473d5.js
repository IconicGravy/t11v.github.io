(function () {
    const u3Qb_k9 = {
        x1pA: "https://discordapp.com/users/637660932734058500",
        Yp7d: "https://www.roblox.com/users/3699752878/profile",
        vT2m: "https://open.spotify.com/user/fzp80tg7jz8raz5xnhxy3a3or",
        Zk9f: "https://www.instagram.com/futaluver214/"
    };

    let _tmp = 0; 
    const _wasteFn = () => { _tmp += Math.random() > 2 ? 1 : 0; }; 

    Object.keys(u3Qb_k9).forEach(Qv2_ => {
        (function (El0_) {
            const qW8r = document.getElementById(El0_);
            if (!qW8r) return;
            qW8r.style.cursor = ["pointer"][0]; 
            qW8r.addEventListener("click", function (aR6x) {
                _wasteFn(); 
                ((ev) => ev.preventDefault())(aR6x); 
                [window][0].open(u3Qb_k9[El0_], "_blank"); 
            });
        })(Qv2_);
    });
})();
