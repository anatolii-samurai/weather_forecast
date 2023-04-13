window.addEventListener('DOMContentLoaded',() => {
    //tabs
    let tabs = document.querySelectorAll('.tabheader_item'),
        tabsContent = document.querySelectorAll('.wrapper-weather'),
        tabsParent = document.querySelector('.weather-items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.visibility = 'hidden';
        });
        tabsContent.forEach(item =>{
            item.classList.remove = '.tabheader_item_active';
        });
        }
    function showTabContent(i = 0) {
        tabsContent[i].style.visibility = 'visible';
        tabs[i].classList.add = 'tabheader_item_active';
    }
        hideTabContent();
         showTabContent();
        tabsParent.addEventListener('click',function(event){
            const target = event.target;
            if(target && target.classList.contains('tabheader_item')){
                tabs.forEach((item,i) =>{
                    if(target == item){
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    });