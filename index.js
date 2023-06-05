const body=document.getElementById("body");
body.addEventListener("load",getMenu());
let foodmenu=[];


/* -------------------------fetching data from json file------------------- */
function getMenu() 
{
    let url="https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";
    
    fetch(url).then(
        (response) => {
            if(response.ok)
                return response.json();
            else
                displayWindow("Error in fetching json");
                //alert("Error in fetching json")
        }).then(
            (data) => {
                foodmenu=data;
                //console.log(data);
                //console.log(foodmenu[0]);
            })
}

//creating a food menu container to append all fetched data
let foodmenugrid=document.getElementById("food_menu_container");

setTimeout(
    () => {
        for (let i = 0; i < foodmenu.length; i++) 
    {
    
    //creating elements
    let element=document.createElement("section");
    let element_1=document.createElement("section");
    let element_1_img=document.createElement("img");
    let element_2=document.createElement("label");
    let element_3=document.createElement("section");
    let element_3_1=document.createElement("label");
    let element_3_2=document.createElement("button");
    
    //intializng and appending and setting attributes of element_1_img which is img
    element_1_img.src=""+(foodmenu[i].imgSrc);
    element_1_img.alt="foodpic";
    element_1_img.setAttribute("class","menu_item_img");
    element_1.append(element_1_img);
    element_1.setAttribute("class","menu_item_img_align");

    //intializng element_2 and setting attributes of food name
    element_2.innerHTML=""+(foodmenu[i].name);
    element_2.setAttribute("class","menu_item_name");

    //intializng and appending and setting attributes element_3_1,_2 which is food price and add to cart btn to element_3
    element_3.setAttribute("class","menu_item_price_button");
    element_3_1.innerHTML=""+(foodmenu[i].price);
    element_3_1.setAttribute("class","menu_item_price");
    element_3_2.innerHTML="Add to Cart";
    element_3_2.setAttribute("class","menu_item_button");
    element_3.append(element_3_1,element_3_2);

    //finally appending all three elements to section element 
    element.append(element_1,element_2,element_3);
    element.setAttribute("class","menu_items_container")
    foodmenugrid.append(element);
    }
    },1000);


//getting a html collection of all add to cart btn and intializing amt=0
let addtocartbtn=document.getElementsByClassName("menu_item_button");
let amt=0;
setTimeout(
    () => {
        for(let i=0;i<addtocartbtn.length;i++)
        {   
            //adding click event listener to all add to cart btn using html collection
            addtocartbtn[i].addEventListener("click",() => {
                document.getElementById("cart_container").style.top="0rem";
                let list=document.getElementById("cart_item_list");
                //creating list element and their children and finally appending children to list and list to ul tag 
                let listitem=document.createElement("li");
                listitem.setAttribute("class","cart_item");//set attribute
                let item1=document.createElement("label");
                let item2=document.createElement("label");
                item1.innerHTML=foodmenu[i].name;
                item2.innerHTML=foodmenu[i].price;
                amt+=foodmenu[i].price;
                listitem.append(item1,item2);//append 
                list.append(listitem);//append

            });
        }
    },1000);

let orderObj=new Object();//

function takeOrder()
{
    //sees how many food items have been added responds accordingly
    let cartlist=document.getElementById("cart_item_list").children;
    if(cartlist.length < 3)
        displayWindow("You haven't added 3 Items to cart");//alert("You haven't added 3 Items to cart")
    else if(cartlist.length > 3)
        displayWindow("You can only add 3 Items to cart Cancel Cart and try again");//alert("You can only add 3 Items to cart")
    else
        {
            //returns promise object with resole which contain object in string format or reject if error occurs using Error constructor;
            return new Promise(
                (resolve,reject) => {
                    setTimeout(
                        () => {
                    
                            //resolve('{"order_status":"false", "paid":"false"}');
                            reject(new Error("Could Not Take Order, Refresh and Try again"));
                        
                        //orderObj=orderObjInner;
                        },2500)
                        //console.log(orderObj);
                    });
        }
}

function orderPrep() 
{
    //returns promise object with resolve with the value of order_status changed or reject if error ocuurs using Error constructor;
    return new Promise(
        (resolve,reject) => {
            setTimeout(
                () => 
                {
                    
                    resolve('{"order_status":"true", "paid":"false"}');
                    reject(new Error("Could Not Prepare Your Order, Refresh and Try again"))
                    
                },1500)});    
}

function payOrder() 
{
    //returns promise object with resolve with the value of paid changed or reject if error ocuurs using Error constructor;
    return new Promise(
        (resolve,reject) => {
            setTimeout(
                () => {
                    
                    resolve('{"order_status":"true", "paid":"true"}')
                    reject(new Error("Payment Unsuccesfull ,Refresh and Try again"));    
                },1000)
            });    
}

//called atlast when paid===true;
function thankyouFnc() 
{
    alert("Thankyou for eating with us today!");
    closeCart(); 
}

let submitOrder=document.getElementById("orderSubmit");
submitOrder.addEventListener("click",() => {
    setTimeout(
        () =>
    {
        takeOrder()
        .then(
            (data) => {
                let temp=JSON.parse(data);//takeorder resolve string getting converted to object
                if(temp.order_status === "false");
                    displayWindow("Order taken");//alert("Order taken")//informing user on process using displayWindow
                return orderPrep();//calling another func
            },
            (err) => {
                //if error occurs informing user on process using displayWindow
                displayWindow(err);//alert("err");
                }
        )
        .then(
            (data) => {
                let temp=JSON.parse(data);//orderPrep resolve string getting converted to object
                if(temp.order_status === "true")
                    displayWindow("Order is being prepared");//informing user on process using displayWindow
                return payOrder();//calling another func
            },
            (err) => {
                //if error occurs informing user on process using displayWindow
                displayWindow(err);//alert("err");
            }
        )
        .then(
            (data) => {
                let temp=JSON.parse(data);//payOrder resolve string getting converted to object
                if(temp.paid === "true")
                {
                    alert("Pay Amount:"+amt);
                    setTimeout(thankyouFnc,1000);//calling thankyouFnc atlast;
                    
                }
                    
            },
            (err) => {
                displayWindow(err);//alert("err");
            }
        )
    },1000
    );
});

//close cart and remove its list
function closeCart() {
    document.getElementById("cart_container").style.top="-400px";
    let removelist=document.getElementById("cart_item_list");
    while(removelist.hasChildNodes)
    {
        removelist.removeChild(removelist.firstChild);
    }
}

 /* function displayWindow(message)
{
    document.getElementById("message_content").innerHTML=message;
    document.getElementById("message_display_window").style.opacity="1";
    document.getElementById("message_display_window").style.pointerEvents="auto";
    document.getElementById("cart_container").style.filter="blur(2px)";
    document.getElementById("food_menu_container").style.filter="blur(2px)";
    document.getElementById("body").style.pointerEvents="none";
}

function closeWindow()
{
    document.getElementById("message_content").innerHTML="";
    document.getElementById("message_display_window").style.opacity="0";
    document.getElementById("message_display_window").style.pointerEvents="none";
    document.getElementById("cart_container").style.filter="none";
    document.getElementById("food_menu_container").style.filter="none";
}  */

//display message to user in window
function displayWindow(message)
{
    document.getElementById("message_content").innerHTML=message;
    document.getElementById("message_display_window").style.opacity="1";
    document.getElementById("message_display_window").style.pointerEvents="auto";
    document.getElementById("cart_container").style.filter="blur(2px)";
    document.getElementById("food_menu_container").style.filter="blur(2px)";
    document.getElementById("body").style.pointerEvents="none";
    setTimeout(closeWindow,4000);
}

//closewindow when not required
function closeWindow()
{
    document.getElementById("message_content").innerHTML="";
    document.getElementById("message_display_window").style.opacity="0";
    document.getElementById("message_display_window").style.pointerEvents="none";
    document.getElementById("cart_container").style.filter="none";
    document.getElementById("food_menu_container").style.filter="none";
    document.getElementById("body").style.pointerEvents="auto";
}
function closeWindow1()
{
    document.getElementById("message_content").innerHTML="";
    document.getElementById("message_display_window").style.opacity="0";
    document.getElementById("message_display_window").style.pointerEvents="none";
    document.getElementById("cart_container").style.filter="none";
    document.getElementById("food_menu_container").style.filter="none";
    document.getElementById("body").style.pointerEvents="auto";
}



