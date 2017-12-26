$('.ui.dropdown').dropdown();
var data = "";
var guild = {
	id: [],
	icon: [],
	name: []
};
var user = {
	icon: ""
};
$(document).ready(function () {
	$.get("/api/mutualGuilds", function (json) {
		data = json;

		const _map = new Map(Object.entries(data.mutualGuilds));

		if (data.userinfo.user.avatar == null) {
			user.icon = "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png";
			console.log(user.icon);
			console.log();
		} else {
			user.icon =
				`https://cdn.discordapp.com/avatars/${data.id}/${data.userinfo.user.avatar}.png`;
			console.log(user.icon);
		}

		for (let num = 0; num < _map.size; num++) {
			console.log(_map.get(num.toString()).id);
			guild.id.push(_map.get(num.toString()).id);
			guild.name.push(_map.get(num.toString()).name);
			if (_map.get(num.toString()).icon == null) {
				guild.icon.push("https://semantic-ui.com/images/wireframe/square-image.png");
			} else {
				guild.icon.push(
					`https://cdn.discordapp.com/icons/${guild.id[num]}/${_map.get(num.toString()).icon}.png`
				);
			}
		}
		setTimeout(function () {
			$('#userContent').append(
				`
<div class="content">
<div class="header">
<img class="ui avatar image" src=${user.icon}>${data.userinfo.user.username}#${data.userinfo.user.discriminator}
</div>
<div class="meta">Friend</div>
<div class="description">
Elliot Fu is a film-maker from New York.
</div>
</div>
<div class="extra content">
<div class="left floated right aligned six wide column">
		<i class="heartbeat icon"></i>
		${data.generalSettings.lovePoints} Love points
</div>
<div class="left floated left aligned six wide column">
				<i class="money icon"></i>
				${data.generalSettings.points} points    
		</div>
</div>



<div class="ui animated button" tabindex="0" onclick="displayModal()">
<div class="visible content"><i class="privacy icon"></i>Privacy settings</div>
<div class="hidden content">
	<i class="right arrow icon"></i>
</div>
</div>

<div class="ui modal" id="privacySettingsModal">
<i class="close icon"></i>
<div class="header">
Privacy settings
</div>
<div class="image content">
<div class="ui small circular image">
	<img src="${user.icon}">
</div>
<div class="content">
<p>Below are your Felix-related data privacy settings</p>
<div class="ui toggle checkbox">
	<input type="checkbox" name="upvote_privacy" id="upvotePrivacy">
<label>Public upvote</label>
</div>
<br>
<br>
<br>
<div class="ui toggle checkbox" id="pointsPrivacyContainer">
	<input type="checkbox" name="points_privacy" id="pointsPrivacy">
<label>Public points</label>
</div>
<br>
<br>
<br>
<div class="ui toggle checkbox">
	<input type="checkbox" name="love_privacy" id="lovePrivacy">
<label>Public love</label>
</div>
<br>
<br>
<br>
<div class="ui toggle checkbox">
	<input type="checkbox" name="level_privacy" id="levelPrivacy">
<label>Public experience/level</label>
</div>
<br>
<br>
<br>
<div class="ui toggle checkbox">
	<input type="checkbox" name="profile_privacy" id="profilePrivacy">
<label>Public profile</label>
</div>
</div>
</div>
<div class="actions">
		<div class="ui negative button" onclick="updateCheckboxes()">
				Discard changes
				<i class="trash outline icon"></i>
		</div>
		<div class="ui positive right labeled icon button" id="savePrivacySettingsButton" onclick="updatePrivacySettings()">
				Save changes
				<i class="checkmark icon"></i>
		</div>
</div>
</div>
`
			);
		}, 0);
		setTimeout(function () {
			$('#userContent2').append(
				`
<div class="content">
		<div class="header">
				<img class="ui avatar image" src=${user.icon}>${data.userinfo.user.username}#${data.userinfo.user.discriminator}
		</div>
		<div class="meta">Friend</div>
		<div class="description">
				Elliot Fu is a film-maker from New York.
		</div>
</div>
<div class="extra content">
		<i class="heart icon"></i> ${data.generalSettings.lovePoints} Love points
</div>
`
			);
		}, 0);
		setTimeout(function () {
			for (let index = 0; index <
				_map.size; index++) {
				$('#menu').append(
					` <div class="item" data-value=${guild.id[index]}>
		<img class="ui circular image flag" src=${guild.icon[index]}> ${guild.name[index]}
		</div>
		`
				);
			}
			$('#menu').dropdown('refresh');
		}, 0);
	});
});

// $(document).ready(function () {
// 	$("#get").click(function () {
// 		$.get("/api/test", function (data, status) {
// 			alert("Data: " + data + "\nStatus: " + status);
// 		});
// 	});
// });


// // changes text on load
// //$("#push-change").load("/api/test");


// $("form").submit(function(e) {
// 	e.preventDefault();
// 	var txt = $("#take_my_value_to_push").val();
// 	$.post("/api/test", { number: txt }, function (result) {
// 		$("#push_change").html(result.number);
// 	});
// });
