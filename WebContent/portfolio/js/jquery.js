
function addJavascript(jsname) {// functions.js 불러오기

  var th = document.getElementsByTagName('head')[0];

  var s = document.createElement('script');

  s.setAttribute('type', 'text/javascript');

  s.setAttribute('src', jsname);

  th.appendChild(s);

}
addJavascript('functions.js');


$(document).ready(function () {
  //menu//
  //mlnb01//
  $(".menu").on("click", function () {
    $(".mlnb").css({
      width: "100%",
      height: "100%",
    });
  });
  $("i").on("click", function () {
    $(".mlnb").css({
      width: "0",
    });
  });
  $(".mlnb li").click(function () {
    $(".mlnb").css({
      width: "0",
    });
  });


  //menu//

  let info = [
    {
      albumpath: "images/1.png",
      audiopath: "music/braveGirls.mp3",
      selfiepath: "images/lkh.jpg",
      mbti: "images/mbti1.png"
    },
    {
      albumpath: "images/2.jpg",
      audiopath: "music/celebrity.mp3",
      selfiepath: "images/khj.jpg",
      mbti: "images/mbti2.png"
    },
    {
      albumpath: "images/3.png",
      audiopath: "music/coffee.mp3",
      selfiepath: "images/kyh.jpg",
      mbti: "images/mbti3.png"
    },
    {
      albumpath: "images/4.png",
      audiopath: "music/braveGirls.mp3",
      selfiepath: "images/sth.jpg",
      mbti: "images/mbti4.png"
    },
    {
      albumpath: "images/5.jpeg",
      audiopath: "music/celebrity.mp3",
      selfiepath: "images/lsy.jpg",
      mbti: "images/mbti5.png"
    },
    {
      albumpath: "images/6.jpg",
      audiopath: "music/coffee.mp3",
      selfiepath: "images/kmh.jpg",
      mbti: "images/mbti6.png"
    },
  ];

  var index = 0;
  var anchors = [
    "1stPage",
    "2ndPage",
    "3rdPage",
    "4thPage",
    "5thPage",
    "6thPage",
    "7thPage",
    "8thPage",
  ];



  //메인페이지 앨범아트, 각 페이지 셀카
  let li = $("#box > ul >li");
  let album = $("#box > ul >li > a > div");
  let selfiesection = $(".aboutphoto");


  for (let index = 0; index < li.length; index++) {

    // 앨범아트 넣기
    let img = info[index].albumpath;
    album[index].style.backgroundImage = "url(" + img + ")";
    album[index].style.backgroundSize = 180 + "px";

  }

  pages = 6;
  for (let index = 1; index <= pages; index++ ) {
    
    //페이지별 셀카 넣기
    let selfie = info[index-1].selfiepath;
      $("#section" + index + " .aboutPhoto").attr("style","background-Image:url('" + selfie + "'); background-size:400px");

    //페이지별 mbti
    let mbti = info[index-1].mbti;
    $("#section" + index + " .mbti").attr("style","background-Image:url('" + mbti + "'); background-size:500px");

  }



  // 계속 옆으로 도는 메뉴 만들기
  // 이 쿼리문과 css애니메이션 콤비
  $("#box > ul > li").clone().appendTo("#box > ul");


  //이전 버튼
  $('#prevbtn').on({
    click: function () {
      index = findActive();
      $('#prevbtn').attr("href", "#" + anchors[--index]);
    }
  })

  //노래 재생, 정지 버튼                                                                                  //from stay
  $("#pausebtn").on({
    click: function () {
      let check = $("#realaudio").attr("class"); //audio의 class가 playing인지 pause인지 구별하기위한 변수
      console.log(check);
      console.log("THIS IS PAUSEBTN");

      let track = findActive();
      console.log("track : " + track)

      console.log("track is not 0");
      if (check === "playing") {
        $("#realaudio").removeClass("playing").addClass("pause");
        $("#realaudio").attr("src", "");
      } else if (check === "pause") {
        $("#realaudio").removeClass("pause").addClass("playing");
        audioPlay(track, info);
      }
    },
  });

  //다음버튼
  $('#nextbtn').on({
    click: function () {
      index = findActive();
      if (index == 7) {
        index = -1;
      }
      $('#nextbtn').attr("href", "#" + anchors[++index]);

    }
  });

  //fullpage//
  $("#fullpage").fullpage({
    sectionSelector: ".section",
    scrolloverflow: true,
    anchors: anchors,
    navigation: true,
    navigationTooltips: [
      "Intro",
      "About",
      "Portfolio01",
      "Portfolio02",
      "Portfolio03",
      "Portfolio04",
      "Portfolio05",
      "Contact",
    ],
    slidesNavigation: true,
    menu: "#menu",
    afterLoad: function (origin, destination, direction) {                                  //from stay
      if (origin) {
        progressbar_start(origin.index, destination.index);
        audioPlay(destination.index, info); // destination.index >> 현재 페이지 번호
      }
    },
  });
  //fullpage//

  //progressbar reset하고 start하기
  function progressbar_start() {
    let page = findActive();//페이지 번호

  }
  //progressbar reset하고 start하기

  //인원에 맞는 노래 플레이//
  //페이지에 맞는 번호와 audio index를 매칭해서 노래 플레이
  function audioPlay(index, info) {                                                                //from stay
    if (index !== 0) {
      console.log("this is " + index);
      console.log(info[index - 1]);
      $("#realaudio").attr("src", info[index - 1].audiopath);
      $("#realaudio").play;
      $("#realaudio").attr("class", "playing");
    } else {
      console.log("this is " + index);
      console.log(info[index - 1]);
      $("#realaudio").attr("src", "");
    }

  };


}); //전체 닫기

function findActive() { /////////////////////////////현재 class에 active인 section 찾아 반환해준다.

  let page;
  $(" div[class*=active]").each(function () {
    // div중 class에 "active"가 포함된
    let id = $(this).attr("id");
    if (id !== undefined) {
      console.log("id : " + id);
      if (id.includes("section")) {
        page = id.substring(id.length - 1);
      }
    }
  });
  console.log("page : " + page);
  return page;

};