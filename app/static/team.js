document.addEventListener('DOMContentLoaded', function() {
    var url = parseInt(window.location.href.slice(27))
    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "d30f039d8a1dd51e4e62f607d3d75f23");
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`https://v3.football.api-sports.io/teams?id=${url}&league=39&season=2021`, requestOptions)
    .then(response => response.json())
    .then(result => {       
            main = document.querySelector('.club-box')
            main.innerHTML = ''
            div_1 = document.createElement('div')    
            div_1.className = "club-info"      
            div_1.innerHTML = `
            <p>Club Info</p>
            <img src=${result.response[0].team.logo}>
                                <h3>${result.response[0].team.name}</h3>
                                <div class="info-box">
                                    <p><strong>Founded: </strong>${result.response[0].team.founded}</p>
                                </div>`
            div_2 = document.createElement('div')    
            div_2.className = "club-info"   
            div_2.innerHTML = `
            <p>Club Stadium</p>
            <img src=${result.response[0].venue.image}>
            <h3>${result.response[0].venue.name}</h3>
            <div class="info-box">
                <p><strong>City: </strong>${result.response[0].venue.city}</p>
                <p><strong>Capacity: </strong>${result.response[0].venue.capacity}</p>
                <p><strong>Adress: </strong>${result.response[0].venue.address}</p>
            </div>` 
            main.append(div_1, div_2)      
    })
    .catch(error => console.log('error', error));


    fetch(`https://v3.football.api-sports.io/teams/statistics?season=2021&team=${url}&league=39`, requestOptions)
    .then(response => response.json())
    .then(result => {  
        let gd =  parseInt(result.response.goals.for.total.total) - parseInt(result.response.goals.against.total.total)
        statics = document.querySelector('.statics')
        statics.innerHTML = `<h3><p>Played:</p><span>${result.response.fixtures.played.total}</span><br><strong>Matches</strong></h3>
                            <h3><p>Won:</p><span>${result.response.fixtures.wins.total}</span><br><strong>Matches</strong></h3>
                            <h3><p>Lose:</p><span>${result.response.fixtures.loses.total}</span><br><strong>Matches</strong></h3>
                            <h3><p>Draw:</p><span>${result.response.fixtures.draws.total}</span><br><strong>Matches</strong></h3>
                            <h3><p>Gf:</p><span>${result.response.goals.for.total.total}</span><br><strong>Coals</strong></h3>
                            <h3><p>GA:</p><span>${result.response.goals.against.total.total}</span><br><strong>Coals</strong></h3>
                            <h3><p>GD:</p><span>${gd}</span><br><strong>Coals</strong></h3>
                            <h3><p>Clean Sheet:</p><span>${result.response.clean_sheet.total}</span><br><strong>Matches</strong></h3>
                            <h3><p>PENALTY:</p><span>${result.response.penalty.total}</span><br><strong>Penalty</strong></h3>
                            <h3><p>Missed:</p><span>${result.response.penalty.missed.total}</span><br><strong>Penalty</strong></h3>
                            <h3><p>Scored:</p><span>${result.response.penalty.scored.total}</span><br><strong>Penalty</strong></h3>
                            <h3><p>Most played formation:</p><span>${result.response.lineups[0].formation}</span><br><strong>Formation</strong></h3>`
    })
    .catch(error => console.log('error', error));


    fetch(`https://v3.football.api-sports.io/players/squads?team=${url}`, requestOptions)
    .then(response => response.json())
    .then(result => {   
        squad = document.querySelector('.squad')
        squad.innerHTML = ''
        for (const i in result.response[0].players)
        {
            console.log(result.response[0].players[i])
            player = document.createElement('div')
            player.className = 'player'
            player.innerHTML = `
                        <p>Position: ${result.response[0].players[i].position}</p>
                        <div class="player-info-box2">
                            <img src=${result.response[0].players[i].photo}>
                            <div class="player_info_box_s">
                                <h4><strong>name: </strong>${result.response[0].players[i].name}</h4>
                                <h4><strong>Age: </strong>${result.response[0].players[i].age}</h4>
                            </div>
                        </div>`
            squad.append(player)
        }
    })
    .catch(error => console.log('error', error));
})