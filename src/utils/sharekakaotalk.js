export const shareKakao = (route, title, desc, img, name) => {
    // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
    if (window.Kakao) {
        const kakao = window.Kakao;
        if (!kakao.isInitialized()) {
            kakao.init('apikey'); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
        }

        kakao.Link.sendDefault({
            objectType: 'feed', // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
            content: {
                title: title, // 인자값으로 받은 title
                description: desc + name + '입니다', // 인자값으로 받은 title
                imageUrl: img,
                link: {
                    mobileWebUrl: route, // 인자값으로 받은 route(uri 형태)
                    webUrl: route,
                },
            },
            buttons: [
                {
                    title: title,
                    link: {
                        mobileWebUrl: route,
                        webUrl: route,
                    },
                },
            ],
        });
    }
};
