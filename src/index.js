const container = document.getElementById("container");
const loading = document.querySelector('.loading');


var page = 1;
var per_page = 30;
var total_pages;
getPost();

$(window).scroll(function(){

    if( $(document).height() - $(this).height() == $(this).scrollTop() )
    {
        if(page <= total_pages){
            
            page = page + 1;
            showLoading();
        }
        else {
            alert("You have read all the articles!");
        }
     
    }
})
    
function showLoading() {
	loading.classList.add('show');
    
	// load more data
	setTimeout(getPost, 1000)
}


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
        <div class="post">
            
            <h3 class="title" >${post.title}</h3>
            <h4 class="postDate">${postDate}</h4>
            <img class="image" src="${post.featured_image.source}" alt="image" />
            <h4 class="author">Written by :${post.author.display_name}</h4>
            
            <div class="desc">${post.content}</div>
            
            <button id="${post.id}"class="readmore-btn">Read More</button>
            
        </div>
        `;
        // <span class="postButton">
        // </span>
    container.appendChild(postElement);

        var flag = false;
        $(".readmore-btn").click(function(){
            // flag = true;
            if(flag === true){
                flag = false;
                $(this).parent().removeClass("showContent"); 
                var replaceText = "Read More";
                $(this).text(replaceText);
            }
            else{
                flag = true;
                $(this).parent().addClass("showContent");
                var replaceText = "Read Less";
                $(this).text(replaceText);

            }
    
            })
    

    loading.classList.remove('show');
     })
};

