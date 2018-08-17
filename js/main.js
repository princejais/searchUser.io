$(document).ready(function(){
    $.ajax({
        url: "https://api.github.com/users?client_id=d9625e102465b04deecf&client_secret=c5b943b5cd568064ad2539b2938fa64d39e54b58",
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            var result = res.map(function(userName){
                return userName.login
            });
            autocomplete(document.getElementById("searchUsers"), result);
        }
    });

    $("#submitForm").submit(function(e) {
        $('#cardBlock').html("");

        function getFormattedDate(date) {
            const monthNames = ["0","Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var date = new Date(date);
            return monthNames[date.getMonth() + 1] + '-' + date.getDate() + '-' +  date.getFullYear();
        }

        var userSearchedVal = $('#searchUsers').val();
        var url = `https://api.github.com/users/${userSearchedVal}?client_id=d9625e102465b04deecf&client_secret=c5b943b5cd568064ad2539b2938fa64d39e54b58`;
        $.ajax({
               type: "GET",
               url: url,
               success: function(res){
                   var userTemplate =
                   `
                   <div class="card" style="width: 24rem;">
                    <img class="card-img-top" src="${res.avatar_url}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title c_name">${res.name ? res.name : 'N/A'}</h5>
                        <p class="card-text c_date">${getFormattedDate(res.created_at)}</p>
                        <p class="card-text">Repo:  <a href="${res.repos_url}" target="_blank" class=""><b>${res.company ? res.company : 'N/A'}</b></a></p>
                        <p class="card-text">Email: ${res.email ? res.email : 'N/A'}</p>
                        <p class="card-text">Location: ${res.location ? res.location : 'N/A'}</p>

                        <p class="card-text">Stars: ${res.stars ? res.stars : 'N/A'}</a></p>
                        <p class="card-text">Fork: ${res.fork ? res.fork : 'N/A'}</p>
                        <p class="card-text">Contributors: ${res.contributors ? res.contributors : 'N/A'}</p>
                        <a href="${res.url}" target="_blank" class="btn btn-primary btn-block">${res.name} GitHub</a>
                    </div>
                    </div>
                   `;
                   $('#cardBlock').append(userTemplate);
               },
               error: function(request,status,errorThrown) {
                   if(status === 'error'){
                       alert('Please Enter a Valid User');
                   }
               }
        });
        e.preventDefault();
    });
});