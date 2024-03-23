var myDropdown = document.getElementById("myDropdown");
function getMenue() {
  if (myDropdown.classList.contains('show')) {
    myDropdown.classList.remove('show');
  } else {
    myDropdown.classList.toggle("show");
  }
}
window.onclick = function(e) {
  if (e.target.className != 'dropbtn') {
    if (e.target.className != 'fa fa-caret-down') {
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {

  /*function createGallery(items) {
    let appContent = document.getElementById("portalApp");
    var dataList = items.results;
    var cnt = 1;
    const appType = ["Web Experience", "Dashboard", "Web Mapping Application"];
    console.log(dataList);
    var leftV = 0;
    var topV = 0;
    dataList.forEach(element => {
      if (appType.includes(element.type)) {
        var mainCard = document.createElement('div');
        var img = document.createElement('img');
        if (element.thumbnailUrl) {
          img.src = element.thumbnailUrl;
        } else {
          img.src = "images/portfolio/project-11.png";
        }
        
        if (leftV < 1000) {
          leftV = leftV + 394;
        } else {
          leftV = 0;
          topV = topV + 394;
        }

        var hTitle = document.createElement("h6");
        var tTitle = document.createTextNode(element.title);
        hTitle.appendChild(tTitle);
        var pDesc = document.createElement("p");
        var pContent = document.createTextNode(element.description);
        pDesc.appendChild(pContent);
        var overlay = document.createElement('div');
        overlay.className = 'overlay-info full-width vertical-center';
        overlay.appendChild(hTitle);
        overlay.appendChild(pDesc);
        var linkA = document.createElement('a');
        linkA.href = element.url;
        var submain = document.createElement('div');
        submain.className = 'img-overlay valign';
        submain.appendChild(overlay);
        submain.appendChild(linkA);
        var con = document.createElement('div');
        con.className = 'portfolio-item brand';
        con.style.width = "394px";
        con.style.height = "394px";
        con.style.position = "absolute";
        con.style.left = leftV + "px";
        con.style.top = topV + "px";
        con.appendChild(img);
        con.appendChild(submain);
        mainCard.appendChild(con);
        appContent.appendChild(mainCard);
      }
    });
    
  }*/

  function counter(id, start, end, duration, value) {
   let obj = document.getElementById(id),
    current = start,
    range = end - start,
    increment = end > start ? 1 : -1,
    step = Math.abs(Math.floor(duration / range)),
    timer = setInterval(() => {
     current += increment;
     obj.textContent = current;
     if (current == end) {
      clearInterval(timer);
      obj.textContent = value;
     }
    }, step);
  }

  require(["esri/request"], function getNo (esriRequest) {
    let url = "https://geos.rer.sa/server/rest/services/Deeds/appAmanaBoundaryS/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics=%5B%7B%22onStatisticField%22%3A%22Deeds_with_Complete_Data%22%2C%22outStatisticFieldName%22%3A%22Deeds_with_Complete_Data_sum%22%2C%22statisticType%22%3A%22sum%22%7D%5D";
    esriRequest(url, { responseType: "json" }).then(function(response) {
      let geoJson = response.data;
      var digi_deeds = geoJson.features[0].attributes.Deeds_with_Complete_Data_sum;
      counter("count1", 0, 400, 3000, digi_deeds);
    });
    let url2 = "https://geos.rer.sa/server/rest/services/Deeds/appAmanaBoundaryS/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics=%5B%7B%22onStatisticField%22%3A%22Total_Linked_Deeds%22%2C%22outStatisticFieldName%22%3A%22Total_Linked_Deeds_sum%22%2C%22statisticType%22%3A%22sum%22%7D%5D";
    esriRequest(url2, { responseType: "json" }).then(function(response) {
      let geoJson = response.data;
      var digi_deeds = geoJson.features[0].attributes.Total_Linked_Deeds_sum;
      counter("count2", 100, 50, 2500, digi_deeds);
    });
    let url3 = "https://geos.rer.sa/server/rest/services/Deeds/appAmanaBoundaryS/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics=%5B%7B%22onStatisticField%22%3A%22Percent_Linked_to_Complete_Deed%22%2C%22outStatisticFieldName%22%3A%22Percent_Linked_to_Complete_Deed_avg%22%2C%22statisticType%22%3A%22avg%22%7D%5D";
    esriRequest(url3, { responseType: "json" }).then(function(response) {
      let geoJson = response.data;
      var digi_deeds = geoJson.features[0].attributes.Percent_Linked_to_Complete_Deed_avg;
      var num2 = parseFloat(digi_deeds).toFixed(2)
      counter("count3", 0, 40, 3000, num2);
    });
  });

  /*require(["esri/portal/Portal", "esri/portal/PortalQueryParams"], function getItems (Portal, PortalQueryParams) {
    const portal = new Portal({
      url: "https://geos.rer.sa/portal"
    });
    portal.load().then(() => {
      const queryParams = new PortalQueryParams({
        query: "owner:RER.GDMS",
        num: 20
      });
      portal.queryItems(queryParams).then(createGallery);
    });
  });*/

 });