let workItems = document.querySelector(".work-items");
var item_view = document.querySelector(".work-view");

let clickItems = document.querySelectorAll(".work-contant .navbar-item");
let itemFilter = workData;

/**
 * 1 => All
 * 2 => Restaurants 
 * 3 => Medical
 * 4 => Custom house
 * 5 => Constructions
 * 6 => General Contracting
 */


window.addEventListener('load',function(){
  var full_url = document.URL; // Get current url
  var url_array = full_url.split('?id=') // Split the string into an array with / as separator
  var last_segment = url_array[url_array.length-1];  // Get the last part of the array (-1)
  
  if (last_segment==1 || last_segment==2 || last_segment==3 || last_segment==4 || last_segment==5 || last_segment==6){
    setTimeout(() => {
      filterData(parseInt(last_segment));
    }, 50);
    clickItems.forEach((e)=>{
      e.style.backgroundColor="#fff";
      e.style.color="#065992";
    });
    clickItems[last_segment].style.backgroundColor="#065992";
    clickItems[last_segment].style.color="#fff";
  }



  document.querySelector('.more').addEventListener('click',function(){
    if (document.querySelector('.more-close').style.display!='block'){
      document.querySelector('.more-text').style.display='none';
      document.querySelector('.more-close').style.display='block';
      document.querySelector('.work-navItem-ul').style.height='420px';
    }else{
      document.querySelector('.more-text').style.display='block';
      document.querySelector('.more-close').style.display='none';
      document.querySelector('.work-navItem-ul').style.height='0px';
    }
  });

  window.addEventListener('resize',function(){
    console.log(window.innerWidth);
    if (window.innerWidth>'720'){
      document.querySelector('.work-navItem-ul').style.height='fit-content';
    }else{
      document.querySelector('.work-navItem-ul').style.height='0px';
    }
  });
});

// resume work here
clickItems.forEach((ele, i) => {
  ele.addEventListener("click", () => {
    filterData(i);
    if (window.innerWidth<'720'){
      document.querySelector('.work-navItem-ul').style.height='0px';
      document.querySelector('.more-text').style.display='block';
      document.querySelector('.more-close').style.display='none';
    }
    clickItems.forEach((e)=>{
      e.style.backgroundColor="#fff";
      e.style.color="#065992";
    });
    ele.style.backgroundColor="#065992";
    ele.style.color="#fff";
  });
});

window.addEventListener("load", () => {
  DrowItems(itemFilter);
});
let workItem;
let circleImage;
let swepAble = 0;

let closeImage = document.querySelector(".close-image");

// closing view image box
closeImage.addEventListener("click", function () {
  item_view.style.visibility = "hidden";
  item_view.style.opacity = "0";
  item_view.style.position = "absolute";
});

function DrowItems(arrayItems,i=0) {
  workItems.innerHTML = "";
  arrayItems.forEach((ele) => {
    if (ele.name!=='Empty'){
      let items = `
            <div class="work-main-item col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <div class="layer" title="view photo"><span class="project-title">${ele.name}</span></div>
                <img class="f1" src="${ele.imageURL[0]}.jpg" alt="" srcset="">
            </div>
        `;
      workItems.innerHTML += items;
    }else if (i==1){
      let items = `
            <div class="work-main-item empty col-sm-12 col-md-6 col-lg-4 col-xl-3" status='empty'>
                <div class='empty'>This page is curenrly empty</div>
            </div>
        `;
      workItems.innerHTML += items;
    }
  });
  var item_image = document.querySelectorAll(".work-main-item");
  item_image.forEach((ele, i) => {
    ele.addEventListener("click", () => {
      let itemImage = ele.lastElementChild;
      if (ele.getAttribute('status')!='empty'){
        let img = itemImage.getAttribute("src");
        item_view.style.visibility = "visible";
        item_view.style.opacity = "1";
        item_view.style.position = "sticky";
        var itemData = workData.find((ele) => ele.id == i);
        item_view.style.backgroundImage ="url('" + img + "')";
      }
    });
  });
}


function filterData(i){
  clickItems.forEach((ele) => {
    switch (i){
      case 0:
        DrowItems(workData);
        break;
      case 1:
        itemFilter = workData.filter((ele) => ele.type == "Resturants");
        DrowItems(itemFilter,1);
        break;
      case 2:
        itemFilter = workData.filter((ele) => ele.type == "Medical");
        DrowItems(itemFilter);
        break;
      case 3:
        itemFilter = workData.filter((ele) => ele.type == "Custom house");
        DrowItems(itemFilter);
        break;
      case 4:
        itemFilter = workData.filter((ele) => ele.type == "Constructions");
        DrowItems(itemFilter,1);
        break;
      case 5:
        itemFilter = workData.filter((ele) => ele.type == "General Contracting");
        DrowItems(itemFilter,1);
        break;
      default:
        break;
    }
  });
}



