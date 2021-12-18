document.addEventListener('DOMContentLoaded', function() {
        var myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", "d30f039d8a1dd51e4e62f607d3d75f23");
        myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");
    
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("https://v3.football.api-sports.io/standings?league=39&season=2021", requestOptions)
        .then(response => response.json())
        .then(result => {
            
            tb = document.querySelector('#standings')
            tb.innerHTML = ''
            for (const element in  result.response[0].league.standings[0])
            {
                tr = document.createElement('tr')
                data = []
                data.push(result.response[0].league.standings[0][element].rank)
                data.push(result.response[0].league.standings[0][element].team.logo)
                data.push(result.response[0].league.standings[0][element].team.name)
                data.push(result.response[0].league.standings[0][element].all.played)
                data.push(result.response[0].league.standings[0][element].all.win)
                data.push(result.response[0].league.standings[0][element].all.draw)
                data.push(result.response[0].league.standings[0][element].all.lose)
                data.push(result.response[0].league.standings[0][element].all.goals.against)
                data.push(result.response[0].league.standings[0][element].all.goals.for)
                data.push(result.response[0].league.standings[0][element].goalsDiff)
                data.push(result.response[0].league.standings[0][element].points)
                for (let i = 0; i < 11; i++)
                {
                    td = document.createElement('td')
                    td.className = `t${i}`
                    if (i == 1)
                    {
                        td.innerHTML = `<img src=${data[i]}>`
                    }
                    else
                    {
                        td.innerHTML = data[i]
                    }
                    tr.append(td)
                }
                tb.append(tr)
            }                       
            })
        .catch(error => console.log('error', error));
})