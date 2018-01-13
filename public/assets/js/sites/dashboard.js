// update settingsFunc
// eslint-disable-next-line no-unused-vars
const postDataFunc = (url, data) => $.post({
    url: url,
    data: JSON.stringify(data),
    dataType: "json",
    contentType: "application/json",
    sucess: null,
}).done(() => {
    $(url.includes('user') ? "#userSettingsContainer" : "#guildSettingsContainer").append(`
	<div class="ui floating positive message">
		<i class="close icon"></i>
		<div class="header">
			Success
		</div>
		<p>Successfully updated the settings</p>
	</div>
`);
    $(".message .close").on("click", function() {
        $(this)
            .closest(".message")
            .transition("fade");
    });
}).fail(() => {
    // console.error(error);
    $(url.includes('user') ? "#userSettingsContainer" : "#guildSettingsContainer").append(`
			<div class="ui floating negative message">
<i class="close icon"></i>
<div class="header">
Awww, something bad occurred :v
</div>
<p>Failed to update the settings
</p></div>
	`);
    $(".message .close").on("click", function() {
        $(this)
            .closest(".message")
            .transition("fade");
    });
});

// functions

const roleOptions = (selectedServer) => (
        `${selectedServer.roles.map(product => product.name !== "@everyone" && product.managed === false ? `
	<option class="item" data-value=${product.id}>${product.name}</option>` : "").join("")}`
);
const channelOptions = (selectedServer) => (
	`${selectedServer.channels.map(product => product.type === 0 ? `
		<div class="item" data-value="${product.id}">#${product.name}</div>` : "").join("")}`
)

const updateCheckboxes = function () {
	// fu css
	document.getElementById("upvotePrivacy").removeAttribute("checked");
	if (data.dataPrivacy.publicUpvote) {
		document.getElementById("upvotePrivacy").setAttribute("checked", "");
	}
	document.getElementById("lovePrivacy").removeAttribute("checked");
	if (data.dataPrivacy.publicLove) {
		document.getElementById("lovePrivacy").setAttribute("checked", "");
	}
	document.getElementById("levelPrivacy").removeAttribute("checked");
	if (data.dataPrivacy.publicLevel) {
		document.getElementById("levelPrivacy").setAttribute("checked", "");
	}
	document.getElementById("pointsPrivacy").removeAttribute("checked");
	if (data.dataPrivacy.publicPoints) {
		document.getElementById("pointsPrivacy").setAttribute("checked", "");
	}
	document.getElementById("profilePrivacy").removeAttribute("checked");
	if (data.dataPrivacy.publicProfile) {
		document.getElementById("profilePrivacy").setAttribute("checked", "");
	}
};

const displayModal = function () {
	if (!data.editedPrivacySettings) {
		// In the shadows update the settings when the checkboxes are clicked
		data.editedPrivacySettings = data.dataPrivacy;
		document
			.getElementById("pointsPrivacyContainer")
			.addEventListener("click", () => {
				data.editedPrivacySettings.publicPoints = data.editedPrivacySettings
					.publicPoints
					? false
					: true;
			});
		document.getElementById("lovePrivacy").addEventListener("click", () => {
			data.editedPrivacySettings.publicLove = data.editedPrivacySettings
				.publicLove
				? false
				: true;
		});
		document.getElementById("profilePrivacy").addEventListener("click", () => {
			data.editedPrivacySettings.publicProfile = data.editedPrivacySettings
				.publicProfile
				? false
				: true;
		});
		document.getElementById("levelPrivacy").addEventListener("click", () => {
			data.editedPrivacySettings.publicLevel = data.editedPrivacySettings
				.publicLevel
				? false
				: true;
		});
		document.getElementById("upvotePrivacy").addEventListener("click", () => {
			data.editedPrivacySettings.publicUpvote = data.editedPrivacySettings
				.publicUpvote
				? false
				: true;
		});
	}
	updateCheckboxes();

	$("#privacySettingsModal").modal("show");
};

$(".ui.dropdown").dropdown();
let data = "";
const guild = {
	icon: [],
};
const user = {
	icon: "",
};
let selectedServer;
// calls the api to get data
$.get("/api/mutualGuilds", function (json) {
	data = json;

	const _map = new Map(Object.entries(data.mutualGuilds));

	if (data.userinfo.user.avatar === null) {
		user.icon =
			"https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png";
	} else {
		user.icon = `https://cdn.discordapp.com/avatars/${data.id}/${
			data.userinfo.user.avatar
		}.png`;
	}

	// making sure theres a defualt server image if the server have not chosen one
	_map.forEach((product) => {
		if (product.icon === null) {
			guild.icon.push(
				"https://semantic-ui.com/images/wireframe/square-image.png"
			);
		} else {
			guild.icon.push(
				`https://cdn.discordapp.com/icons/${product.id}/${product.icon}.png`
			);
		}
	});

	// adding the profile html
	setTimeout(function () {
		$("#userContent").append(`
			<div class="ui fluid cards">
			<div class="card">
				<div class="content">
					<div class="header">
						<img class="ui avatar image" src=${user.icon}>
							${data.userinfo.user.username}#${data.userinfo.user.discriminator}
					</div>
					<div class="description">
						Level : ${data.experience.level}
						<br> Experience : ${data.experience.expCount}
					</div>
				</div>
				<div class="extra content">
					<div class="left floated right aligned six wide column">
						<i class="heartbeat icon"></i>
						121 Love points
					</div>
					<div class="right floated left aligned six wide column">
						<i class="money icon"></i>
						50000 points
					</div>
				</div>
		
				<div class="ui animated button" tabindex="0" id="privacyModal">
					<div class="visible content">
						<i class="privacy icon"></i>Privacy settings</div>
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
							<img src=${user.icon}>
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
						<div class="ui negative button" id="updateCheckboxes">
							Discard changes <i class="trash outline icon"></i>
						</div>
						<div class="ui positive right labeled icon button" id="savePrivacySettingsButton">
							Save changes
							<i class="checkmark icon"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
				`);
	}, 0);
	// adding items for dropdown (servers)
	setTimeout(() => {
		_map.forEach((product, index) => {
			$("#menu").append(`
		<div class="item" data-value=${product.id}>
			<img class="ui circular image" src=${guild.icon[index]}> ${product.name}
		</div>
		`);
		});
		setTimeout(() => {
			$(".dropdown.fluid.server").dropdown("refresh");
		}, 0);
	}, 0);

	// when a server has been chosen html will be inserted
	$(".dropdown.fluid.server").dropdown("setting", "onChange", function () {
		_map.forEach((product) => {
			if (product.id === $(".dropdown.fluid.server").dropdown("get value")) {
				selectedServer = product;

				$("#serverSettings").empty();

				$("#serverSettings").append(`
			<div class="ui form">
			<div class="fields">
				<div class="six wide field">
					<label>Set prefix</label>
					<input type="text" name="prefix" id="prefix">
				</div>
			</div>
			<div class="ui form">
				<div class="fields">
					<div class="six wide field">
						<label>Set greeting message</label>
						<div class="ui blue button" id="greetModalSettings">Open settings</div>
					</div>
				</div>
				<div class="fields">
					<div class="six wide field">
						<label>Set farewell settings</label>
						<div class="ui blue button" id="farewellModalSettings">Open settings</div>
					</div>
				</div>
				<div class="fields">
					<div class="six wide field">
						<label>Set starboard settings</label>
						<div class="ui blue button" id="starboardModalSettings">Open settings</div>
					</div>
				</div>
			</div>
		</div>



		<div class="ui modal farewell">
		<i class="close icon"></i>
		<div class="header">
			${selectedServer.name}'s farewell message settings
		</div>
		<div class="image content">
			<div class="ui small circular image">
				<img src=${selectedServer.icon === null ? "https://semantic-ui.com/images/wireframe/square-image.png" : `https://cdn.discordapp.com/icons/${selectedServer.id}/${selectedServer.icon}.png`}>
			</div>
			<div class="content">
				<div class="ui form">
					<div class="field">
						<div class="fields">
							<div class="twelve wide field">
								<label>Set farewell message</label>
								<textarea type="text" name="setFarewell" id="FarewellMsg" placeholder="farewell message here" ${selectedServer.database.onEvent.guildMemberRemove.farewell.enabled	? "" : "disabled"}></textarea>
								<div class="sub header disabled"><i class="info circle icon"></i> Any instance of %GUILD%, %USERNAME% and %USERTAG% will respectively be replaced by the guild name, the username of the user and the username + discriminator of the user</div>
							</div>
						</div>
						<label>Targeted channel:</label>
						<div class="ui fluid search selection dropdown FarewellChannel">
						<i class="dropdown icon"></i>
						${selectedServer.database.onEvent.guildMemberRemove.farewell.channel ? '<div class="text">' + (selectedServer.channels.find((c) => c.id === selectedServer.database.onEvent.guildMemberRemove.farewell.channel) 
						? '#' + selectedServer.channels.find((c) => c.id === selectedServer.database.onEvent.guildMemberRemove.farewell.channel).name : '#deleted-channel') + '</div>'
						: '<div class="default text">Select channel</div>'}
							<div class="menu" id = "farewellTargetsList">
							${channelOptions(selectedServer)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="actions">
			<div class="ui blue button" id="btnFarewellMsg">
				${selectedServer.database.onEvent.guildMemberRemove.farewell.enabled ? "Disable" : "Enable"}
			</div>
			<div class="ui negative right labeled icon button" id="updateCheckboxes">
				Cancel <i class="remove icon"></i>
			</div>
			<div class="ui positive right labeled icon button" id="saveFarewellSettingsButton">
				Save changes
				<i class="checkmark icon"></i>
			</div>
		</div>
	</div>






	<div class="ui modal greeting">
  <i class="close icon"></i>
  <div class="header">
    ${selectedServer.name}'s greeting message settings
  </div>
  <div class="image content">
    <div class="ui small circular image">
      <img src=${selectedServer.icon === null ? "https://semantic-ui.com/images/wireframe/square-image.png" : `https://cdn.discordapp.com/icons/${selectedServer.id}/${selectedServer.icon}.png`}>
    </div>
    <div class="content">
      <div class="ui form">
        <div class="field">
          <div class="fields">
            <div class="twelve wide field">
              <label>Set greeting message</label>
			  <textarea id="GreetMsg" placeholder="greeting message here" ${selectedServer.database.onEvent.guildMemberAdd.greetings.enabled ? "" : "disabled"}></textarea>
			  <div class="sub header disabled"><i class="info circle icon"></i> Any instance of %GUILD%, %USER%, %USERNAME% and %USERTAG% will respectively be replaced by the guild name, the mention of the user, the username of the user and the username + discriminator of the user</div>
            </div>
          </div>
          <label>Targeted channel:</label>
          <div class="ui fluid search selection dropdown GreetingChannel">
            <i class="dropdown icon"></i>
			${selectedServer.database.onEvent.guildMemberAdd.greetings.target ? '<div class="text">' + (selectedServer.database.onEvent.guildMemberAdd.greetings.target === "dm" 
			? 'Direct Message' : '<div class="text">' + (selectedServer.channels.find((c) => c.id === selectedServer.database.onEvent.guildMemberAdd.greetings.target) 
			? '#' + selectedServer.channels.find((c) => c.id === selectedServer.database.onEvent.guildMemberAdd.greetings.target).name : '#deleted-channel')) + '</div>'
			: '<div class="default text">Select channel</div>'}
            <div class="menu" id="greetingsTargetsList">
						${channelOptions(selectedServer)}
						<div class="item" data-value="dm">Direct Message</div>
            </div>
					</div>
					<label>Assigned role(s) when user joins:</label>
					<div class="ui fluid search multiple selection dropdown roleoptions" multiple="">
						<input type="hidden" name="roles" id="onJoinRolesInputList">
						<i class="dropdown icon"></i>
						<input class="search" autocomplete="off" id="afterRolesChildElement">
						<span class="sizer"></span>
						<div class="default text">select a role</div>
						<div class="menu">
						${roleOptions(selectedServer)}
						</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="actions">
    <div class="ui blue button" id="btnGreetMsg">
      ${selectedServer.database.onEvent.guildMemberAdd.greetings.enabled ? "Disable" : "Enable"}
    </div>
    <div class="ui negative right labeled icon button">
      Cancel
      <i class="remove icon"></i>
    </div>
    <div class="ui positive right labeled icon button" id="saveGreetingsSettingsButton">
      Save changes
      <i class="checkmark icon"></i>
    </div>
  </div>
</div>

<div class="ui modal starboard">
<i class="close icon"></i>
<div class="header">
	${selectedServer.name}'s starboard settings
</div>
<div class="image content">
	<div class="ui small circular image">
		<img src=${selectedServer.icon === null ? "https://semantic-ui.com/images/wireframe/square-image.png" : `https://cdn.discordapp.com/icons/${selectedServer.id}/${selectedServer.icon}.png`}>
	</div>
	<div class="content">
		<div class="ui form">
				<div class="fields">
					<div class="twelve wide field">		
						<label>Minimum number of star per message</label>
						<input type="text" id="txtNum" value=${selectedServer.database.starboard.minimum} >
					</div>
				</div>
				<label>Targeted channel:</label>
				<div class="ui fluid search selection dropdown StarboardChannel">
					<i class="dropdown icon"></i>
					${selectedServer.database.starboard.channel ? '<div class="text">' + (selectedServer.channels.find((c) => c.id === selectedServer.database.starboard.channel) 
					? '#' + selectedServer.channels.find((c) => c.id === selectedServer.database.starboard.channel).name : '#deleted-channel') + '</div>'
					: '<div class="default text">Select channel</div>'}					<div class="menu" id="starboardTargetsList">
						${channelOptions(selectedServer)}
					</div>
				</div>
		</div>
	</div>
</div>
<div class="actions">
	<div class="ui blue button" id="resetStarboardBtn">
		Reset starboard
	</div>
	<div class="ui negative right labeled icon button" >
		Cancel
		<i class="remove icon"></i>
	</div>
	<div class="ui positive right labeled icon button" id="saveStarboardSettingsButton">
		Save changes
		<i class="checkmark icon"></i>
	</div>
</div>
</div>
				`);
			}
		});
	});
});

$(document).on("click", "#privacyModal", function () {
	displayModal();
});
$(document).on("click", "#updateCheckboxes", function () {
	updateCheckboxes();
});
$(document).on("click", "#savePrivacySettingsButton", function () {
	data.dataPrivacy = data.editedPrivacySettings;
	postDataFunc(`/api/userData`, data);
});

// farewell settings

$(document).on("click", "#btnFarewellMsg", function () {
	if ((document.getElementById("btnFarewellMsg").innerHTML) === "Disable") {
		$('#FarewellMsg').prop("disabled", true);
		document.getElementById("btnFarewellMsg").innerHTML = "Enable";
		$('.ui.dropdown.FarewellChannel').addClass("disabled");
		selectedServer.database.onEvent.guildMemberRemove.farewell.enabled = false;
	} else {
		$('#FarewellMsg').prop("disabled", false);
		document.getElementById("btnFarewellMsg").innerHTML = "Disable";
		$('.ui.dropdown.FarewellChannel').removeClass("disabled");
		selectedServer.database.onEvent.guildMemberRemove.farewell.enabled = true;
	}
});

$(document).on("click", "#farewellModalSettings", function () {
	$('.ui.modal.farewell').modal({
		autofocus: false,
	}).modal('show');

	$('.ui.dropdown.FarewellChannel').dropdown();
	selectedServer.database.onEvent.guildMemberRemove.farewell.enabled === false ? $('.ui.dropdown.FarewellChannel').addClass("disabled") : null;
	//Insert the already-set greetings message if its the case
	document.getElementById('FarewellMsg').innerHTML = selectedServer.database.onEvent.guildMemberRemove.farewell.message;
	//Insert the already-set target if its the case
	if (selectedServer.database.onEvent.guildMemberRemove.farewell.channel) {
		/*const dbTarget = selectedServer.database.onEvent.guildMemberRemove.farewell.message;
		const target = document.createElement('div');
		target.setAttribute('class', 'text');
		target.innerHTML = selectedServer.channels.find((c) => c.id === dbTarget) ? `#${selectedServer.channels.find((c) => c.id === dbTarget).name}` : '#deleted-channel';
		if (document.getElementsByClassName('FarewellChannel')[0].getElementsByClassName('default')[0]) {
			document.getElementsByClassName('FarewellChannel')[0].removeChild(document.getElementsByClassName('FarewellChannel')[0].getElementsByClassName('default')[0]);
			document.getElementsByClassName('FarewellChannel')[0].insertBefore(target, document.getElementById('farewellTargetsList'));*/
			const farewellTargetsList = document.getElementById('farewellTargetsList');
			for (let i = 0; i < farewellTargetsList.children.length; i++) {
				if (farewellTargetsList.children[i].innerHTML === document.getElementsByClassName('FarewellChannel')[0].getElementsByClassName('text')[0].innerHTML) {
					return farewellTargetsList.children[i].classList = "item active selected";
			}
		}
	}
});

$(document).on("click", "#saveFarewellSettingsButton", function () {	
	selectedServer.database.onEvent.guildMemberRemove.farewell.channel = document.getElementById('farewellTargetsList').getElementsByClassName('selected')[0] ?
	document.getElementById('farewellTargetsList').getElementsByClassName('selected')[0].getAttribute('data-value') : false;
	selectedServer.database.onEvent.guildMemberRemove.farewell.disabled = document.getElementsByClassName('FarewellChannel')[0].classList.contains('disabled') ? true : false;
	selectedServer.database.onEvent.guildMemberRemove.farewell.message = document.getElementById('FarewellMsg').value;
	postDataFunc(`/api/guildData`, selectedServer.database);
});

// greetings settings

$(document).on("click", "#btnGreetMsg", function () {
	if ((document.getElementById("btnGreetMsg").innerHTML) === "Disable") {
		$('#GreetMsg').prop("disabled", true);
		document.getElementById("btnGreetMsg").innerHTML = "Enable";
		$('.ui.dropdown.GreetingChannel').addClass("disabled");
		selectedServer.database.onEvent.guildMemberAdd.greetings.enabled = false;
	} else {
		$('#GreetMsg').prop("disabled", false);
		document.getElementById("btnGreetMsg").innerHTML = "Disable";
		$('.ui.dropdown.GreetingChannel').removeClass("disabled");
		selectedServer.database.onEvent.guildMemberAdd.greetings.enabled = true;
	}
});

$(document).on("click", "#greetModalSettings", function () {
	$('.ui.modal.greeting').modal({
		autofocus: false,
	}).modal('show');

	selectedServer.database.onEvent.guildMemberAdd.greetings.enabled === false ? $('.ui.dropdown.GreetingChannel').addClass("disabled") : null;
	$('.ui.dropdown.GreetingChannel').dropdown();
	$('.ui.dropdown.roleoptions').dropdown({
		useLabels: true,
		maxSelections: 4,
	});
	//Insert the already-set onjoinroles if its the case
	selectedServer.database.onEvent.guildMemberAdd.onJoinRole.filter((storedRole) => selectedServer.roles.find((r) => r.id === storedRole)
&& (!document.getElementById('onJoinRolesInputList').hasAttribute('value') || !document.getElementById('onJoinRolesInputList').getAttribute('value').includes(storedRole))).forEach((r) => {
		const role = document.createElement("a");
		role.classList = 'ui label transition visible';
		role.setAttribute('data-value', r);
		role.innerHTML = selectedServer.roles.find((role) => role.id === r).name;
		role.setAttribute('style', 'display: inline-block !important;');
		const deleteIcon = document.createElement("i");
		deleteIcon.classList = "delete icon";
		role.appendChild(deleteIcon);
		document.getElementById('onJoinRolesInputList').setAttribute('value', selectedServer.database.onEvent.guildMemberAdd.onJoinRole.filter((storedRole) => selectedServer.roles.find(r => r.id === storedRole)).join(', '));
        document.getElementsByClassName('roleoptions')[0].insertBefore(role, document.getElementById('afterRolesChildElement'));
	});
	document.getElementById('onJoinRolesInputList').setAttribute('value', selectedServer.database.onEvent.guildMemberAdd.onJoinRole.filter((storedRole) => selectedServer.roles.find(r => r.id === storedRole)).join(','));
	//Insert the already-set greetings message if its the case
	document.getElementById('GreetMsg').innerHTML = selectedServer.database.onEvent.guildMemberAdd.greetings.message;
	//Insert the already-set target if its the case
	if (selectedServer.database.onEvent.guildMemberAdd.greetings.target) {
		/*const dbTarget = selectedServer.database.onEvent.guildMemberAdd.greetings.target;
		const target = document.createElement('div');
		target.setAttribute('class', 'text');
		target.innerHTML = dbTarget === "dm" ? 'Direct Message' : (selectedServer.channels.find((c) => c.id === dbTarget) ? `#${selectedServer.channels.find((c) => c.id === dbTarget).name}` : '#deleted-channel');
		if (document.getElementsByClassName('GreetingChannel')[0].getElementsByClassName('default')[0]) {
			document.getElementsByClassName('GreetingChannel')[0].removeChild(document.getElementsByClassName('GreetingChannel')[0].getElementsByClassName('default')[0]);
			document.getElementsByClassName('GreetingChannel')[0].insertBefore(target, document.getElementById('greetingsTargetsList'));*/
			const greetingsTargetList = document.getElementById('greetingsTargetsList');
			for (let i = 0; i < greetingsTargetList.children.length; i++) {
				if (greetingsTargetList.children[i].innerHTML === document.getElementsByClassName('GreetingChannel')[0].getElementsByClassName('text')[0].innerHTML) {
					return greetingsTargetList.children[i].classList = "item active selected";
				}
			}
		}
});

$(document).on("click", "#saveGreetingsSettingsButton", function () {	
	selectedServer.database.onEvent.guildMemberAdd.onJoinRole = document.getElementById('onJoinRolesInputList').hasAttribute('value') ? 
	document.getElementById('onJoinRolesInputList').getAttribute('value').split(',') : [];
	selectedServer.database.onEvent.guildMemberAdd.greetings.target = document.getElementById('greetingsTargetsList').getElementsByClassName('selected')[0] ?
	document.getElementById('greetingsTargetsList').getElementsByClassName('selected')[0].getAttribute('data-value') : false;
	selectedServer.database.onEvent.guildMemberAdd.greetings.disabled = document.getElementsByClassName('GreetingChannel')[0].classList.contains('disabled') ? true : false;
	selectedServer.database.onEvent.guildMemberAdd.greetings.message = document.getElementById('GreetMsg').value;
	postDataFunc(`/api/guildData`, selectedServer.database);
});

// starboard settings

$(document).on("click", "#starboardSettings", function () {
	if ((document.getElementById("starboardSettings").innerHTML) === "Disable") {
		$('#GreetMsg').prop("disabled", true);
		document.getElementById("starboardSettings").innerHTML = "Enable";
		$('.ui.dropdown.GreetingChannel').addClass("disabled");
		selectedServer.database.onEvent.guildMemberAdd.greetings.enabled = false;
	} else {
		$('#GreetMsg').prop("disabled", false);
		document.getElementById("starboardSettings").innerHTML = "Disable";
		$('.ui.dropdown.GreetingChannel').removeClass("disabled");
		selectedServer.database.onEvent.guildMemberAdd.greetings.enabled = true;
	}
});

$(document).on("click", "#starboardModalSettings", function () {
	$('.ui.modal.starboard').modal({
		autofocus: false,
	}).modal('show');

	selectedServer.database.onEvent.guildMemberAdd.greetings.enabled === false ? $('.ui.dropdown.starboard').addClass("disabled") : null;
	$('.ui.dropdown.StarboardChannel').dropdown();
});

$(document).on("keypress", "#txtNum", function (e) {
	var charCode = e.which || e.keyCode;
	if (charCode < 48 || charCode > 57) {
		return false;
	}
	return true;
});

// save starboard settings

$(document).on("click", "#saveStarboardSettingsButton", function () {
	selectedServer.database.starboard.channel = document.getElementById('starboardTargetsList').getElementsByClassName('selected')[0] ?
	document.getElementById('starboardTargetsList').getElementsByClassName('selected')[0].getAttribute('data-value') : false;
	selectedServer.database.starboard.minimum = parseInt(document.getElementById('txtNum').value);
	postDataFunc(`/api/guildData`, selectedServer.database);
});