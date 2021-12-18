document.addEventListener('DOMContentLoaded', function() {
    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "d30f039d8a1dd51e4e62f607d3d75f23");
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    let data = [{'api': 'topscorers','where': 'goals', 'id': 'total', 'name': 'Goals'}, 
                {'api': 'topassists','where': 'goals', 'id': 'assists', 'name': 'Assists'}, 
                {'api': 'topyellowcards','where': 'cards', 'id': 'yellow', 'name': 'Yellow Cards'}, 
                {'api': 'topredcards','where': 'cards', 'id': 'red', 'name': 'Red Cards'}]

    for (let i in data)
    {
        fetch(`https://v3.football.api-sports.io/players/${data[i].api}?season=2021&league=39`, requestOptions)
        .then(response => response.json())
        .then(result => {      
            div = document.querySelector(`#${data[i].id}`)
            let stat = ''
            if (data[i].id == 'total')
            {
                stat = result.response[0].statistics[0].goals.total
            }
            else if (data[i].id == 'assists')
            {
                stat = result.response[0].statistics[0].goals.assists
            }
            else if (data[i].id == 'yellow')
            {
                stat = result.response[0].statistics[0].cards.yellow
            }
            else
            {
                stat = result.response[0].statistics[0].cards.red
            }
            div.innerHTML = `<div class="player-stat">
                            <img src=${result.response[0].player.photo}>
                            <div class="player-data">   
                                <p>${result.response[0].player.name}
                                <br>
                                <span>${result.response[0].statistics[0].team.name}</span></p>
                            </div>
                        </div>
                        <p>${stat}<br><span>${data[i].name}</span></p>`
        })
        .catch(error => console.log('error', error));

    }

    fetch("https://v3.football.api-sports.io/standings?league=39&season=2021", requestOptions)
    .then(response => response.json())
    .then(result => {       
        div = document.querySelector('#clubs_box')
        div.innerHTML = ''
        for (const element in  result.response[0].league.standings[0])
        {
            a = document.createElement('a')
            a.className = 'club'
            a.innerHTML = `<img src=${result.response[0].league.standings[0][element].team.logo}> <div class="content"> <h3>${result.response[0].league.standings[0][element].team.name}</h3></div>`
            a.href = `/Team/${result.response[0].league.standings[0][element].team.id}`
            div.append(a)
        }
    })
    .catch(error => console.log('error', error));
})