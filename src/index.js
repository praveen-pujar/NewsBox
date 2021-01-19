
// if(navigator.onLine){

    window.addEventListener("load", () => {
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.register("service-worker.js");
        }
      });

    (function(){
        const container = document.getElementById("container");
        const loading = document.querySelector('.loading');
        const onPageLoad = document.querySelector('.onPageLoad');
        

        // Showing the loading screen while data gets loaded

        // document.onload = () =>{
        //     showLoadingPage();
        // }

        // // Loading page function
        // function showLoadingPage(){
        //     onPageLoad.classList.add('show');
        //     loading.classList.add('show');

        //     // take time to laod
        //     setTimeout(getPost(), 5000);
        // }




        // Global variables
        var page = 1;
        var per_page = 30;
        var total_pages;
        getPost();

        
        // Scrolling event 
        document.onreadystatechange = () => {
        if(document.readyState === 'complete'){
        
            window.addEventListener('scroll', () => {
                const scrollable = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = window.scrollY;
            
                if(Math.ceil(scrolled) >= scrollable){
                    if(page <= total_pages){
                        page = page + 1;
                        showLoading();
                    }
                    else{
                        alert("Sorry, We are finished all the articles!");
                    }
                }
            })
             
        }
        }   
        
        // Balls animation function
        function showLoading() {
            loading.classList.add('show');
            
            // load more data
            setTimeout(getPost, 1000)
        }
        
        // Asynchronous function to get the data
        async function getPost() {
        
            var url = "https://www.techinasia.com/wp-json/techinasia/2.0/posts?page="+page+"&per_page=30";
            var postResponse = await fetch(url);
            var data = await postResponse.json();
            console.log(data);
            total_pages = data.total_pages;
            data.posts.forEach( (post) => {
                const postElement = document.createElement("div");
                postElement.classList.add("blog-post");
                
            
                function format(input) {
                    return new Date(input).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    });
                }
                var postDate = format(post.date_gmt);
        
        
                postElement.innerHTML = `
                <div class="post ">
                    
                    <h3 class="title" >${post.title}</h3>
                    <h4 class="postDate">${postDate}</h4>
                    <img class="image" src="${post.featured_image.source}" alt="image" />
                    <h4 class="author">Written by :${post.author.display_name}</h4>
                    
                    <div id="more-1" class="desc">
                    ${post.content}
                    
                    </div>
                    <button class="readmore-btn">Read More</button>
          
                </div>
                `;
               
            container.appendChild(postElement);
        
            // Show more functionality
                var flag = false;
        
        // document.addEventListener( "DOMContentLoaded" ,() => {
        if ('querySelector' in document && 
        'addEventListener' in window) {
        var toggleButtons = document.querySelectorAll(".readmore-btn");
        
        
        toggleButtons.forEach(toggleButton => {
            
            // add listener for each button
            toggleButton.addEventListener('click', function () {
        
                fullTextWrapper = this.parentElement.querySelector('.desc');
                
                // change attributes and text if full text is shown/hidden
                if(flag === true){
                     flag = false;   
                    this.parentElement.classList.remove("showContent");
                    this.innerHTML = "Read More";
                    }
                else{
                    flag = true;
                    this.parentElement.classList.add("showContent");
                    this.innerHTML = "Read Less" ;
                }
          
            });
            
        })
        }
        // })
        
            
            // onPageLoad.classList.remove('show');
            loading.classList.remove('show');
             })
        };
        
    }())
// }
// else{
//     const postElement = document.createElement("div");
//     postElement.classList.add("offline");

//     postElement.innerHTML = `
//     <div class="offline-post">
//         <h3 >Please turn on your internet to get the latest news!</h3>
//         <img src="src/news.jpg" alt="image" />
//     </div>
//     `;
   
// container.appendChild(postElement);
// }




