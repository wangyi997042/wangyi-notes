// ==UserScript==
// @name         【太香】爱奇艺VIP/优酷VIP/腾讯视频VIP/芒果VIP全网视频VIP，一键VIP视频解析免费在线看，一站式音乐搜索下载，百度云离线跳转，获取B站封面，淘宝京东内部优惠券，解除大部分网站操作限制
// @namespace    http://git.io/yemao
// @version      2.5.7
// @description  全网VIP视频免费破解去广告，一键VIP视频解析、省时省力+懒人专用，集合了爱奇艺、优酷、腾讯、芒果等全网VIP视频免费破解去广告，视频网站免费破解去广告高清在线看，VIP解析站无任何广告，PC、平板、手机都支持，高清解析线路每天更新，网易云音乐，QQ音乐，酷狗音乐，酷我音乐，虾米音乐，百度音乐，蜻蜓FM，荔枝FM，喜马拉雅，一听音乐、咪咕音乐、全民K歌、5sing原创、5sing翻唱，自用+推荐组合型多功能脚本，百度网盘直接下载，获取B站封面，知乎视频下载，淘宝京东内部优惠券免费领取等几个好用常用的功能，给大家提供方便和帮助！报错请及时反馈
// @author       野猫VIP（http://yemao.vip）
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAYCAYAAADtaU2/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmhJREFUeNrEVj1IHEEUfrOoGL0f3WBjUmilhWAnNqLCBQJBYxoxBgtFgp1YWWhpYwioqUQkKQJJG6KCGOG0EqwttEkKJYUH6v1EReFWvzlnnZ2b2b0Vgg/u9m7Y2e993/fem2WO49BjRBm+Xk70hNq03Jl1GCNi+HP7YyQZYWH2r8+tkBU208/dOQ4aq66gKD5V5TTY/zG0bKGB8/kCRubflbvWWn1J/x3YsryqZm8TmPwyzR4MDLlmh2cCJYOfAoWzZsGY4tmyJQxV/fdnt3OSvuALdqySUo0LRhaisBDwGeD2izV6MzWgvR+AdX/GeT1whc6vqb43yQqMpZY6yVzS09/jvoVFMmPs+fWKTGrhWQIUgWJ0Ge99bS/aVBOt5H6KVgGorucFa7m1IGkiNcYJyaAueGKDceCjH13OWVZfmZAeD4QVtfhtCCSAQkPRxyMVxvvSuSt63rdVkHp0O8rs+BPtjZBe+I84zegTBGuwM4EiKfgLLE9VQyLbwEhm6sca4MJ3uc9JM+E8fZw3NBNYAlCwNbGWPY8p3qYa5s0DRB0OKnjL0A5Fmt8XsX72OulhLcDlUNvTkge3mlVRYRx8p3jTIDG7zV1DIlhXJVf9NU4unFBBoy+3v8Sv9R2z7lq86a27Lssts9ZZaGnbx0fu9ME3VApnrWOrFpnJwiLgfMC0Ptz9dMf6A5ddZasrtNrEqj8wP6Ct4KFfYH1/9etthG6Oe4Dhc1CBCdYABVvRaqYEWKnncSlnK4AALgPJCZRinWWczz4hA4rBYppoJuu0wGvH70p+k1BZqzJv1i1q97HHer29EWAANKo1sAp6pyAAAAAASUVORK5CYII=
// @resource     vipLevel http://cdn.dgsldz.com/product/wildcat/images/tv/vip.png
// @include      *://*.youku.com/*
// @include      *://m.youku.com/v*
// @include      *://m.youku.com/a*
// @include      *://v.youku.com/v_*
// @include      *://*.iqiyi.com/*
// @include      *://*.iqiyi.com/v_*
// @include      *://*.iqiyi.com/w_*
// @include      *://*.iqiyi.com/a_*
// @include      *://*.iqiyi.com/adv*
// @include      *://*.le.com/*
// @include      *://*.le.com/ptv/vplay/*
// @include      *v.qq.com/*
// @include      *v.qq.com/x/cover/*
// @include      *v.qq.com/x/page/*
// @include      *v.qq.com/play*
// @include      *v.qq.com/cover*
// @include      *://*.tudou.com/*
// @include      *://*.tudou.com/listplay/*
// @include      *://*.tudou.com/albumplay/*
// @include      *://*.tudou.com/programs/view/*
// @include      *://*.tudou.com/v*
// @include      *://*.mgtv.com/*
// @include      *://*.mgtv.com/b/*
// @include      *://tv.sohu.com/*
// @include      *://film.sohu.com/album/*
// @include      *://tv.sohu.com/v/*
// @include      *://*.acfun.cn/*
// @include      *://*.acfun.cn/v/*
// @include      *://*.bilibili.com/*
// @include      *://*.bilibili.com/video/*
// @include      *://*.bilibili.com/anime/*
// @include      *://*.bilibili.com/bangumi/play/*
// @include      *://*.pptv.com/*
// @include      *://*.pptv.com/show/*
// @include      *://*.baofeng.com/*
// @include      *://*.baofeng.com/play/*
// @include      *://*.wasu.cn/Play/show*
// @include      *://v.yinyuetai.com/video/*
// @include      *://v.yinyuetai.com/playlist/*
// @include      *://*.wasu.cn/Play/show/*
// @include      *://music.taihe.com/song*
// @include      *://item.taobao.com/*
// @include      *://detail.tmall.com/*
// @include      *://detail.tmall.hk/*
// @include      *://item.jd.com/*
// @include      *://music.163.com/song*
// @include      *://music.163.com/m/song*
// @include      *://y.qq.com/*
// @include      *://*.kugou.com/*
// @include      *://*.kuwo.cn/*
// @include      *://*.xiami.com/*
// @include      *://music.taihe.com/*
// @include      *://*.1ting.com/player*
// @include      *://www.qingting.fm/*
// @include      *://www.lizhi.fm/*
// @include      *://music.migu.cn/*
// @include      *://www.shangxueba.com/ask/*.html
// @include      *://www.ximalaya.com/*
// @include      *://www.shangxueba.com/ask/*.html
// @include      *://pan.baidu.com/disk/home*
// @include      *://yun.baidu.com/disk/home*
// @include      *://pan.baidu.com/s/*
// @include      *://yun.baidu.com/s/*
// @include      *://pan.baidu.com/share/link*
// @include      *://yun.baidu.com/share/link*
// @exclude      *://*.avip.fun/*
/*************** 解除网页限制 *************/
// @include      *://b.faloo.com/*
// @include      *://bbs.coocaa.com/*
// @include      *://book.hjsm.tom.com/*
// @include      *://book.zhulang.com/*
// @include      *://book.zongheng.com/*
// @include      *://book.hjsm.tom.com/*
// @include      *://chokstick.com/*
// @include      *://chuangshi.qq.com/*
// @include      *://yunqi.qq.com/*
// @include      *://city.udn.com/*
// @include      *://cutelisa55.pixnet.net/*
// @include      *://huayu.baidu.com/*
// @include      *://tiyu.baidu.com/*
// @include      *://yd.baidu.com/*
// @include      *://yuedu.baidu.com/*
// @include      *://imac.hk/*
// @include      *://life.tw/*
// @include      *://luxmuscles.com/*
// @include      *://read.qidian.com/*
// @include      *://www.15yan.com/*
// @include      *://www.17k.com/*
// @include      *://www.18183.com/*
// @include      *://www.360doc.com/*
// @include      *://www.eyu.com/*
// @include      *://www.hongshu.com/*
// @include      *://www.coco01.com/*
// @include      *://news.missevan.com/*
// @include      *://www.hongxiu.com/*
// @include      *://www.imooc.com/*
// @include      *://www.readnovel.com/*
// @include      *://www.tadu.com/*
// @include      *://www.jjwxc.net/*
// @include      *://www.xxsy.net/*
// @include      *://www.z3z4.com/*
// @include      *://yuedu.163.com/*
// @include      *://*.hao123.com/*
// @include      *://hao.qq.com/*
// @include      *://hao.360.cn/*
// @include      *://123.sogou.com/*
// @include      *://www.2345.com/*
// @require      https://cdn.staticfile.org/jquery/1.12.4/jquery.min.js
// @require      https://lib.baomitu.com/layer/3.1.1/layer.js
// @require      https://cdn.staticfile.org/sweetalert/2.1.2/sweetalert.min.js
// @grant        GM_getResourceURL
// @grant        GM_setClipboard
// @run-at       document-end
// @connect      shangxueba365.com
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_info
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        GM_openInTab
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// ==/UserScript==

(function () {
  "use strict";
  var currentUrl = window.location.href;
  var reBDY = /pan.baidu.com\/s/i;
  var reYk = /youku/i;
  var reAqy = /iqiyi/i;
  var reLS = /le.com/i;
  var reTX = /v.qq/i;
  var reTD = /tudou/i;
  var reMG = /mgtv/i;
  var reSH = /sohu/i;
  var reAF = /acfun/i;
  var reBL = /bilibili/i;
  var reYJ = /1905/i;
  var rePP = /pptv/i;
  var reYYT = /yinyuetai/i;
  var reTaoBao = /taobao.com/i;
  var reTmall = /tmall/i;
  var reJd = /item.jd/i;
  var reWY = /163(.*)song/i;
  var reQQ = /y.QQ(.*)song/i;
  var reKG = /kugou(.*)song/i;
  var reKW = /kuwo(.*)yinyue/i;
  var reXM = /xiami/i;
  var reBD = /taihe.com/i;
  var reQT = /qingting/i;
  var reLZ = /lizhi/i;
  var reMiGu = /migu/i;
  var reXMLY = /ximalaya/i;
  var reSXB = /shangxueba/i;
  var reBili = /bilibili.com\/video\/av/i;
  var reSite = /avip.fun/i;
  var tbCoupon = "https://ai.taobao.com?pid=mm_30255553_1080850467_109750450381&union_lens=lensId%3APUB%401573741379%400b092bc3_0d04_16e6a4bbfbd_0411%4001";
  var jdCoupon =
    "https://union-click.jd.com/jdc?e=&p=AyIGZRprFDJWWA1FBCVbV0IUWVALHEIYDk5ER1xOGWVpDl56Z39WYD5ucEEEPBlFHAAXeRNNVxkyEgdWHlIVMhIGVBhaFwATDlcraxUBIkw7GmsVChADXBhSFgsUN1UfXRcFEQBSG1IcBhU3UhtSJUBCWANZAyUyIgRlK2sUMhI3Cl8GSDIQBlQfUg%3D%3D";
  var t = $.now();
  var vipLevelImg = GM_getResourceURL("vipLevel");
  if (
    reWY.test(currentUrl) ||
    reQQ.test(currentUrl) ||
    reKG.test(currentUrl) ||
    reKW.test(currentUrl) ||
    reXM.test(currentUrl) ||
    reBD.test(currentUrl) ||
    reQT.test(currentUrl) ||
    reLZ.test(currentUrl) ||
    reMiGu.test(currentUrl) ||
    reXMLY.test(currentUrl)
  ) {
    var menus = [
      { title: "影视搜索", show: "影视<br>搜索", type: "search" },
      { title: "音乐下载", show: "音乐<br>下载", type: "process" },
      { title: "淘宝好券", show: "淘宝<br>好券", type: "tb" },
      { title: "京东好券", show: "京东<br>好券", type: "jd" },
    ];
    var f = function () {
      $("body").on("click", "[data-cat=process]", function () {
        InitCurrentUrl();
        if (reXMLY.test(currentUrl)) {
          if (__INITIAL_STATE__.SoundDetailPage != undefined) {
            window.open("http://avip.fun/music?id=" + __INITIAL_STATE__.SoundDetailPage.trackId + "&type=ximalaya");
          } else {
            layer.closeAll();
            var html = '<div style="padding:0px 50px 0px 50px;"><ul class="sound-list dOi2">';
            $.each(__INITIAL_STATE__.AlbumDetailTrackList.tracksInfo.tracks, function (index, item) {
              html += '<li class="dOi2"><a href="http://avip.fun/music?id=' + item.trackId + '&type=ximalaya" target="_blank">' + item.title + "</a></li>";
            });
            html += "</ul></div>";
            layer.open({ type: 1, area: ["auto", "30%"], title: "为你找到了这些曲目解析……什么？我丑？以后再说吧", shade: 0.6, maxmin: false, anim: 2, content: html });
          }
        } else if (/taihe.com/i.test(currentUrl)) {
          window.open("http://avip.fun/music?url=" + encodeURIComponent(currentUrl.replace("taihe", "baidu")));
        } else {
          window.open("http://avip.fun/music?url=" + encodeURIComponent(currentUrl));
        }
      });
      $("body").on("click", "[data-cat=search]", function () {
        window.open("http://avip.fun/tv#search2");
      });
      $("body").on("click", "[data-cat=tb]", function () {
        window.open(tbCoupon);
      });
      $("body").on("click", "[data-cat=jd]", function () {
        window.open(jdCoupon);
      });
    };
    InitMenu(menus, f);
  } else if (
    reAqy.test(currentUrl) ||
    reLS.test(currentUrl) ||
    reTX.test(currentUrl) ||
    reTD.test(currentUrl) ||
    reMG.test(currentUrl) ||
    reSH.test(currentUrl) ||
    rePP.test(currentUrl) ||
    reYk.test(currentUrl)
  ) {
    var menus = [
      { title: "影视搜索", show: "影视<br>搜索", type: "search" },
      { title: "视频解析", show: "视频<br>解析", type: "process" },
      { title: "淘宝好券", show: "淘宝<br>好券", type: "tb" },
      { title: "京东好券", show: "京东<br>好券", type: "jd" },
    ];
    InitMenu(menus, function () {
      $("body").on("click", "[data-cat=process]", function () {
        window.open("http://avip.fun/tv?url=" + encodeURIComponent(window.location.href));
      });
      $("body").on("click", "[data-cat=search]", function () {
        window.open("http://avip.fun/tv#search2");
      });
      $("body").on("click", "[data-cat=tb]", function () {
        window.open(tbCoupon);
      });
      $("body").on("click", "[data-cat=jd]", function () {
        window.open(jdCoupon);
      });
    });
  } else if (reTaoBao.test(currentUrl) || reTmall.test(currentUrl)) {
    loader();
    TINT();
  } else if (reJd.test(currentUrl)) {
    var keywords = $(".sku-name").text().trim();
    $("#choose-btns").prepend('<a href="javascript:;" class="btn-special1 btn-lg btn-yhj"><span class="">查询好券</span></a>');
    $(".btn-yhj").on("click", function () {
      window.open(jdCoupon + "&ah=total&kw=" + encodeURIComponent(keywords));
    });
  } else if (reSXB.test(currentUrl)) {
    var menus = [
      { title: "查看答案", show: "查看<br>答案", type: "search" },
      { title: "打赏作者", show: "打赏<br>作者", type: "process" },
      { title: "淘宝好券", show: "淘宝<br>好券", type: "tb" },
      { title: "京东好券", show: "京东<br>好券", type: "jd" },
    ];
    InitMenu(menus, function () {
      $("body").on("click", "[data-cat=process]", function () {
        layer.open({ type: 1, title: "请我喝一杯", shadeClose: true, area: "679px", content: '<img src="http://cdn.dgsldz.com/common/images/reward_qrcode.png">' });
      });
      $("body").on("click", "[data-cat=search]", function () {
        SXB();
      });
      $("body").on("click", "[data-cat=tb]", function () {
        window.open("https://link.zhihu.com/?target=" + tbCoupon);
      });
      $("body").on("click", "[data-cat=jd]", function () {
        window.open("https://link.zhihu.com/?target=" + jdCoupon);
      });
    });
  } else if (reBDY.test(currentUrl)) {
    var menus = [
      { title: "离线下载", show: "离线<br>下载", type: "search" },
      { title: "打赏作者", show: "打赏<br>作者", type: "process" },
      { title: "淘宝好券", show: "淘宝<br>好券", type: "tb" },
      { title: "京东好券", show: "京东<br>好券", type: "jd" },
    ];
    InitMenu(menus, function () {
      $("body").on("click", "[data-cat=process]", function () {
        layer.open({ type: 1, title: "请我喝一杯", shadeClose: true, area: "679px", content: '<img src="http://cdn.dgsldz.com/common/images/reward_qrcode.png">' });
      });
      $("body").on("click", "[data-cat=search]", function () {
        window.location.href = window.location.href.replace("baidu.com", "baiduwp.com");
      });
      $("body").on("click", "[data-cat=tb]", function () {
        window.open("https://link.zhihu.com/?target=" + tbCoupon);
      });
      $("body").on("click", "[data-cat=jd]", function () {
        window.open("https://link.zhihu.com/?target=" + jdCoupon);
      });
    });
  } else if (reBili.test(currentUrl)) {
    var menus = [
      { title: "查看封面", show: "查看<br>封面", type: "findimg" },
      { title: "打赏作者", show: "打赏<br>作者", type: "process" },
    ];
    InitMenu(menus, function () {
      $("body").on("click", "[data-cat=process]", function () {
        layer.open({ type: 1, title: "请我喝一杯", shadeClose: true, area: "679px", content: '<img src="http://cdn.dgsldz.com/common/images/reward_qrcode.png">' });
      });
      $("body").on("click", "[data-cat=findimg]", function () {
        biliimg();
      });
    });
  }

  function loader() {
    $("body").append($('<script type="text/javascript" src="//cdn.staticfile.org/jquery/1.12.4/jquery.min.js"></script>'));
  }
  function getPar(a) {
    var b = location.search.match(new RegExp("[?&]" + a + "=([^&]+)", "i"));
    if (b == null || b.length < 1) {
      return "";
    }
    return b[1];
  }
  function appendCss(url) {
    $("head").append($('<link rel="stylesheet" href="' + url + '">'));
  }
  function TINT() {
    var h = "https://api.wandhi.com";
    var bid = getPar("id");
    var api = "/api/tb/infos/" + bid;
    appendCss("//cdn.dgsldz.com/product/wildcat/css/tv/tab.css");
    var init =
      "<div id='yemao_div'><table class='yemao_tab' id='yemao_table'><thead><tr><th><b onclick=window.open('https://link.zhihu.com/?target=' + tbCoupon) style='cursor:pointer'>优惠券</b></th><th>券后</th><th>有 效 期</th><th>操作</th></tr></thead><tr><td colspan='4'>正在查询优惠信息，请稍候...</td></tr></table></div>";
    $("#J_LinkBasket").parent().parent().prepend(init);
    $(".J_LinkAdd").parent().parent().prepend(init);
    if (reTaoBao.test(currentUrl)) {
      $("#yemao_table").addClass("yemao_tab_taobao");
    } else {
      $("#yemao_table").addClass("yemao_tab_tmall");
    }
    $.getJSON(h + api, function (d) {
      $("#yemao_table tbody tr").remove();
      var row = "";
      if (d.code) {
        d.data.forEach((e) => {
          row +=
            "<tr><td>" +
            e.quan_context +
            "</td><td>" +
            e.after_price +
            "</td><td>" +
            e.quan_time +
            "</td><td><b onclick=window.open(decodeURIComponent('" +
            e.quan_link +
            "')) style='cursor:pointer'>领取</b></td></tr>";
        });
      } else {
        row = "<tr><td colspan='4'>这个商品没有超值优惠券</td></tr>";
      }
      $("#yemao_table tbody").append(row);
    });
  }
  var answer = "-1";
  function SXB() {
    var loading = layer.load(1, { shade: [0.8, "#393D49"], time: 10 * 1000 });
    var h = "https://api.wandhi.com";
    var id = $("#Hidd_id").val();
    if (!id) {
      Msg("数据异常请联系作者");
      return;
    }
    var api = "/api/tools/sxb/" + id;
    GM_xmlhttpRequest({
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      url: "http://www.shangxueba365.com/post.php",
      responseType: "JSON",
      data: "docinfo=" + encodeURIComponent("https://www.shangxueba.com/ask/" + id + ".html"),
      onload: function (res) {
        if (res.status == 200 && res.response.status) {
          showAnswer(res.response.msg);
        } else {
          Msg("未发现答案");
        }
        layer.close(loading);
      },
    });
  }
  function biliimg() {
    InitCurrentUrl();
    var loading = layer.load(1, { shade: [0.8, "#393D49"], time: 10 * 1000 });
    var h = "https://api.wandhi.com";
    var api = "/api/tools/bili?url=" + currentUrl;
    $.getJSON(h + api, function (d) {
      if (d.code) {
        showContent('<img src="' + d.data + '">', "封面");
      } else {
        Msg("哎哟没找到封面哦，要不跟作者报告一下？");
      }
      layer.close(loading);
    });
  }
  function showAnswer(h) {
    layer.closeAll();
    layer.open({ type: 1, title: "答案", area: ["400px", "300px"], shade: 0, offset: "lb", maxmin: true, content: h });
  }
  function Msg(msg) {
    layer.closeAll();
    layer.msg(msg, { icon: 5 });
  }
  function InitCurrentUrl() {
    currentUrl = window.location.href;
  }
  function InitMenu(obj, init) {
    if (reSite.test(top.window.location.href)) {
      return;
    }
    var menusclass = ["first", "second", "third", "fourth", "fifth"];
    var str = "";
    $.each(obj, function (i, o) {
      str += '<a href="javascript:void(0)" title="' + o.title + '" data-cat="' + o.type + '" class="menu-item menu-line menu-' + menusclass[i] + '">' + o.show + "</a>";
    });
    var sidenav =
      '<svg width="0" height="0"><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"></feColorMatrix><feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite></filter></defs></svg><div class="aside-nav bounceInUp animated" id="Wandhi-nav"><label for="" class="aside-menu" title="按住拖动"><img src="' +
      vipLevelImg +
      '" style="width:32px;height:32px;display:inline-block;vertical-align:middle;" />VIP</label>' +
      str +
      '<div id="crack_vip_copy_box" style="display:none;width:95px;font-size:13px;padding:6px 10px;margin:200px 0 0 89px;background-color:#f9f9f9;"><a href="http://yemao.vip" target="_blank" style="color:#3b8cff;">http://yemao.vip</a></div><div id="yemao_vip_box" style="display:none;width:95px;padding:6px 10px;margin-left:89px;background-color:#f9f9f9;"><iframe src="https://ghbtns.com/github-btn.html?user=wuxingsanren&repo=wildcat-vip-account&type=star&count=true" frameborder="0" style="height:20px;"></iframe></div></div>';
    $("body")
      .append(sidenav)
      .append($('<link rel="stylesheet" href="//cdn.dgsldz.com/product/wildcat/css/tv/side_nav.css">'))
      .append($('<link rel="stylesheet" href="https://lib.baomitu.com/layer/3.1.1/theme/default/layer.css">'));
    var ua = navigator.userAgent;
    /Safari|iPhone/i.test(ua) && 0 == /chrome/i.test(ua) && $("#Wandhi-nav").addClass("no-filter");
    var drags = { down: !1, x: 0, y: 0, winWid: 0, winHei: 0, clientX: 0, clientY: 0 },
      asideNav = $("#Wandhi-nav")[0],
      getCss = function (a, e) {
        return a.currentStyle ? a.currentStyle[e] : document.defaultView.getComputedStyle(a, !1)[e];
      };
    $("body")
      .on("mousedown", "#Wandhi-nav", function (a) {
        (drags.down = !0),
          (drags.clientX = a.clientX),
          (drags.clientY = a.clientY),
          (drags.x = getCss(this, "left")),
          (drags.y = getCss(this, "top")),
          (drags.winHei = $(window).height()),
          (drags.winWid = $(window).width()),
          $(document).on("mousemove", function (a) {
            var e = a.clientX - drags.clientX,
              t = a.clientY - drags.clientY;
            asideNav.style.top = parseInt(drags.y) + t + "px";
            asideNav.style.left = parseInt(drags.x) + e + "px";
          });
      })
      .on("mouseup", "#Wandhi-nav", function () {
        (drags.down = !1), $(document).off("mousemove");
      });
    init();
  }
  function showContent(c, t) {
    layer.closeAll();
    layer.open({ type: 1, title: t, shade: 0, content: c });
  }
  /*
   * 网页解除限制，集成了脚本：网页限制解除（精简优化版）
   * 作者：Cat73、xinggsf
   * 插件版本：1.5.6
   * 原插件地址：https://greasyfork.org/zh-CN/scripts/41075
   */
  //域名规则列表
  const rules = {
    plus: {
      name: "default",
      hook_eventNames: "contextmenu|select|selectstart|copy|cut|dragstart",
      unhook_eventNames: "mousedown|mouseup|keydown|keyup",
      dom0: true,
      hook_addEventListener: true,
      hook_preventDefault: true,
      add_css: true,
    },
  };
  const returnTrue = (e) => true;
  // 获取目标域名应该使用的规则
  const getRule = (host) => {
    return rules.plus;
  };
  const dontHook = (e) => !!e.closest("form");
  //储存被 Hook 的函数
  const EventTarget_addEventListener = EventTarget.prototype.addEventListener;
  const document_addEventListener = document.addEventListener;
  const Event_preventDefault = Event.prototype.preventDefault;
  //要处理的 event 列表
  let hook_eventNames, unhook_eventNames, eventNames;

  //Hook addEventListener proc
  function addEventListener(type, func, useCapture) {
    let _addEventListener = this === document ? document_addEventListener : EventTarget_addEventListener;
    if (!hook_eventNames.includes(type)) {
      _addEventListener.apply(this, arguments);
    } else {
      _addEventListener.apply(this, [type, returnTrue, useCapture]);
    }
  }
  //清理或还原DOM节点的onxxx属性
  function clearLoop() {
    let type,
      prop,
      c = [document, document.body, ...document.getElementsByTagName("div")],
      //https://life.tw/?app=view&no=746862
      e = document.querySelector('iframe[src="about:blank"]');
    if (e && e.clientWidth > 99 && e.clientHeight > 11) {
      e = e.contentWindow.document;
      c.push(e, e.body);
    }
    for (e of c) {
      if (!e) continue;
      e = e.wrappedJSObject || e;
      for (type of eventNames) {
        prop = "on" + type;
        e[prop] = null;
      }
    }
  }
  function init() {
    //获取当前域名的规则
    let rule = getRule(location.host);
    //设置 event 列表
    hook_eventNames = rule.hook_eventNames.split("|");
    //Allowed to return value
    unhook_eventNames = rule.unhook_eventNames.split("|");
    eventNames = hook_eventNames.concat(unhook_eventNames);
    if (rule.dom0) {
      setInterval(clearLoop, 9e3);
      setTimeout(clearLoop, 1e3);
      window.addEventListener("load", clearLoop, true);
    }
    if (rule.hook_addEventListener) {
      EventTarget.prototype.addEventListener = addEventListener;
      document.addEventListener = addEventListener;
    }
    if (rule.hook_preventDefault) {
      Event.prototype.preventDefault = function () {
        if (dontHook(this.target) || !eventNames.includes(this.type)) {
          Event_preventDefault.apply(this, arguments);
        }
      };
    }
    if (rule.add_css)
      GM_addStyle(
        `html, * {
                -webkit-user-select:text !important;
                -moz-user-select:text !important;
                user-select:text !important;
            }
        ::-moz-selection {color:#FFF!important; background:#3390FF!important;}
        ::selection {color:#FFF!important; background:#3390FF!important;}`
      );
  }
  init();
})();
