function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    console.log(ev.path[0].tagName)
    if(ev.path[0].classList.contains("playerDiv"))
    {
        // Don't allow drops on another player
        return;
    }
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

function createTeams()
{
    createTeam("East", "New Jersey Nets", "85%", "35%");
    createTeam("East", "Philidelphia 76ers", "65%", "35%" );
    createTeam("East", "New York Knicks", "85%", "23%" );
    createTeam("East", "Boston Celtics", "85%", "10%" );
    createTeam("East", "Toronto Raptors", "65%", "10%" );
    createTeam("East", "Charlotte Hornets", "78%", "57%" );
    createTeam("East", "Milwaukee Bucks", "65%", "23%" );

    createTeam("West", "Utah Jazz", "27%", "27%" );
    createTeam("West", "Golden State Warriors", "0%", "25%" );

}

function createTeam(conferenceName, tName, inputLeftMargin, inputTopMargin)
{
    var teamImageName = tName.toLowerCase().replace(/\W/g, '') + ".png";
    var teamImageFullPath = "images/team_logos/" + teamImageName;

    var teamDivNameStr = tName.toLowerCase().replace(/\W/g, '') + "div";

    var conferenceDivNameStr = conferenceName.toLowerCase() + "div";
    var team = {teamName: tName, imageName :teamImageFullPath, leftMargin: inputLeftMargin, topMargin : inputTopMargin, 
        conferenceDivName: conferenceDivNameStr, teamDivName: teamDivNameStr};
    teams.push(team);
}

function createPlayers()
{
    /* https://www.foxsports.com/nba/players?teamId=0&season=2018&position=0&playerName=butler&country=0&grouping=0&weightclass=0
        http://www.sportslogos.net/logos/view/512019262015/Charlotte_Hornets/2015/Primary_Logo */

    createPlayer("Kyrie", "Irving", "Boston Celtics");
    createPlayer("Tobias", "Harris", "Philidelphia 76ers");
    createPlayer("Jimmy", "Butler", "Philidelphia 76ers");
    createPlayer("JJ", "Redick", "Philidelphia 76ers");
    createPlayer("Kawhi", "Leonard", "Toronto Raptors");
    createPlayer("Kemba", "Walker", "Charlotte Hornets");
    createPlayer("Klay", "Thompson", "Golden State Warriors");
    createPlayer("Kevin", "Durrant", "Golden State Warriors");
    createPlayer("Nicola", "Vucevic", "Orlando Magic");
    createPlayer("D'Angelo", "Russell", "Brooklyn Nets");
    createPlayer("Malcolm", "Brogdon", "Milwaukee Bucks");
    createPlayer("Khris", "Middleton", "Milwaukee Bucks");
    createPlayer("Nikola", "Mirotic", "Milwaukee Bucks");
    createPlayer("Brook", "Lopez", "Milwaukee Bucks");

}

function createPlayer(fname, lname, tname)
{
    var playerid = fname.toLowerCase() + lname.toLowerCase()
    var fullImageName =  "images/player_images/" + playerid + ".png";
    var fullTeamDivName = tname.toLowerCase().replace(/\W/g, '') + "div";
    var player = { firstName: fname, lastName: lname, imageName: fullImageName, teamName: tname, teamDivName: fullTeamDivName, playerId: playerid};
    players.push(player);
}

function createDivsForAllPlayers()
{
    for(var i = 0 ; i < players.length; i++)
    {
        createDivFromPlayer(players[i]);
        console.log("Creating a div for " + players[i].playerId);
    }
}

function createDivFromPlayer(player)
{
    //<img id="kyrieIrving" class="playerDiv" src="images/player_images/kirving.png" draggable="true"  ondragstart="drag(event)" ondragover="allowDrop(event)">
    var divStr = "<img id='"+ player.playerId + "' class='playerDiv' src='" + player.imageName + "' draggable='true'  ondragstart='drag(event)' >";
    var teamDivName = player.teamDivName;

    $('#' + teamDivName).append(divStr);
}

function createDivsForTeams()
{
    for(var i = 0 ; i < teams.length; i++)
    {
        createDivForTeam(teams[i]);
        console.log("Creating a div for " + teams[i].teamName);
    }
}

function createDivForTeam(team)
{
    //<div id="utahjazzdiv" class="teamSpot" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
    var divStr = "<div id='" + team.teamDivName + "' class='teamSpot' ondrop='drop(event)' ondragover='allowDrop(event)'></div>"

    var conferenceDivName = '#' + team.conferenceDivName;

    $("#backgroundImageDiv").append(divStr);

    var urlString = 'url(' + team.imageName +') no-repeat center';
    console.log(urlString);
    // add styling
    $( '#' + team.teamDivName ).css( "left", team.leftMargin );
    $( '#' + team.teamDivName ).css( "top", team.topMargin );
    $( '#' + team.teamDivName ).css( 'background', urlString);
    $( '#' + team.teamDivName ).css( "background-color", "white" );
    $( '#' + team.teamDivName ).css( "-webkit-background-size", "contain" );
    $( '#' + team.teamDivName ).css( "-moz-background-size", "contain" );
    $( '#' + team.teamDivName ).css( "background-size", "contain" );


    /*
      left: 27%;
  top: 27%;
  background: url("../images/team_logos/jazz.png") no-repeat center;
  background-color: white;
  -webkit-background-size: contain;
  -moz-background-size: contain;
  background-size: contain;*/
}

// variables
var players = [];
var teams = [];

// A $( document ).ready() block.
$( document ).ready(function() {
    createTeams();
    createDivsForTeams();

    createPlayers();
    createDivsForAllPlayers();
});