function toECoach(){
    let cookieToken = getEhToken();
    if(cookieToken!=null){
        let user = cookieToken.user;
        if(!!user){
            fetch(`/coach-web/eTutorStudent/isStudent?id=${user.userId}`)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    }
                })
                .then(result => {
                    if (result=="true") {
                        window.location.href = "/app/coach/";
                    }else{
                        window.location.href = "/event/ecoach/intro-jr.html"
                    }
                })
        }else{
            window.location.href = "/event/ecoach/intro-jr.html"
        }
    }
}
