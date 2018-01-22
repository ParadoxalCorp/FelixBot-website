// update settingsFunc
// eslint-disable-next-line no-unused-vars
let isPosting = "not";

const postDataFunc = async(url, data) => {
    if (isPosting !== "not") await isPosting;
    else isPosting = new Promise((resolve, reject) => resolve);
    $.post({
        url: url,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        success: null,
    }).done(() => {
        isPosting = "not";
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
        isPosting = "not";
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
};

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

	// making sure theres a default server image if the server have not chosen one
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
							<div class="ui slider checkbox">
								<input type="checkbox" name="upvote_privacy" id="upvotePrivacy">
								<label>Public upvote</label>
							</div>
							<br>
							<br>
							<br>
							<div class="ui slider checkbox" id="pointsPrivacyContainer">
								<input type="checkbox" name="points_privacy" id="pointsPrivacy">
								<label>Public points</label>
							</div>
							<br>
							<br>
							<br>
							<div class="ui slider checkbox">
								<input type="checkbox" name="love_privacy" id="lovePrivacy">
								<label>Public love</label>
							</div>
							<br>
							<br>
							<br>
							<div class="ui slider checkbox">
								<input type="checkbox" name="level_privacy" id="levelPrivacy">
								<label>Public experience/level</label>
							</div>
							<br>
							<br>
							<br>
							<div class="ui slider checkbox">
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
                //Convert the roles colors to actual hex colors 
				product.roles.forEach(r => {
					if (!col) var col;
					col = product.roles.find(guildRole => guildRole.id === r.id).color.toString(16);
					while (col.length < 6) col = '0' + col;
					product.roles.find(guildRole => guildRole.id === r.id).hexColor = `#${col}`;
				});
				$("#serverSettings").empty();

				$("#serverSettings").append(`
			<div class="ui form">
			  <div class="field"  id="setPrefixField">
				 <label>Set prefix</label>
				 <div class="ui action input">
					<input type="text" name="prefix" id="prefix" value="${selectedServer.database.generalSettings.prefix}">
					<button class="ui button" id="savePrefixButton">Update</button>
				</div>
              </div>
			<div class="ui cards">
  <div class="card">
    <div class="content">
	  <div class="header">
	     <i class="add user icon"></i>New member settings
	  </div>
      <div class="description">
        Manage the settings such as the greetings and the roles given to new members
      </div>
    </div>
    <div class="ui bottom attached button" id="greetModalSettings">
      <i class="setting icon"></i>
      Open settings
    </div>
  </div>

  <div class="card">
    <div class="content">
	<div class="header">
	<i class="remove user icon"></i>Farewell settings
    </div>
      <div class="description">
        Set the farewell message sent when a member leave
      </div>
    </div>
    <div class="ui bottom attached button" id="farewellModalSettings">
      <i class="setting icon"></i>
      Open settings
    </div>
  </div>

  <div class="card">
    <div class="content">
	<div class="header">
	   <i class="star icon"></i>Starboard settings
    </div>      <div class="description">
        Manage the starboard settings such as the channel or the minimum amount of stars required
      </div>
    </div>
    <div class="ui bottom attached button" id="starboardModalSettings">
      <i class="setting icon"></i>
      Open settings
	</div>
	
  </div>
    <div class="card">
    <div class="content">
	<div class="header">
	   <i class="legal icon"></i>Moderation settings
    </div>      <div class="description">
        Manage the mod-log channel and such
      </div>
    </div>
    <div class="ui bottom attached button" id="moderationModalSettings">
      <i class="setting icon"></i>
      Open settings
    </div>
  </div>

  <div class="card">
  <div class="content">
  <div class="header">
	 <i class="legal icon"></i>Experience & level system settings
  </div>      <div class="description">
	  Manage the settings of the experience system and the roles given at specific points
	</div>
	</div>
  <div class="ui bottom attached button" id="levelSystemModalSettings">
	<i class="setting icon"></i>
	Open settings
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
    ${selectedServer.name}'s new member settings
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
						<input type="text" class="txtNum" id="starboardMinimum" value=${selectedServer.database.starboard.minimum}>
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

<div class="ui modal moderation">
<i class="close icon"></i>
<div class="header">
	${selectedServer.name}'s moderation settings
</div>
<div class="image content">
	<div class="ui small circular image">
		<img src=${selectedServer.icon === null ? "https://semantic-ui.com/images/wireframe/square-image.png" : `https://cdn.discordapp.com/icons/${selectedServer.id}/${selectedServer.icon}.png`}>
	</div>
	<div class="content">
		<div class="ui form">
				<label>Mod-log channel:</label>
				<div class="ui fluid search selection dropdown ModerationChannel">
					<i class="dropdown icon"></i>
					${selectedServer.database.modLog.channel ? '<div class="text">' + (selectedServer.channels.find((c) => c.id === selectedServer.database.modLog.channel) 
					? '#' + selectedServer.channels.find((c) => c.id === selectedServer.database.modLog.channel).name : '#deleted-channel') + '</div>'
					: '<div class="default text">Select channel</div>'}					<div class="menu" id="modLogTargetsList">
						${channelOptions(selectedServer)}
					</div>
				</div>
		</div>
	</div>
</div>
<div class="actions">
	<div class="ui negative right labeled icon button" >
		Cancel
		<i class="remove icon"></i>
	</div>
	<div class="ui positive right labeled icon button" id="saveModerationSettingsButton">
		Save changes
		<i class="checkmark icon"></i>
	</div>
</div>
</div>

<div class="ui modal levelSystem">
<i class="close icon"></i>
<div class="header">
  ${selectedServer.name}'s experience system settings
</div>
<div class="image content">
  <div class="ui small circular image">
	<img src=${selectedServer.icon === null ? "https://semantic-ui.com/images/wireframe/square-image.png" : `https://cdn.discordapp.com/icons/${selectedServer.id}/${selectedServer.icon}.png`}>
  </div>
  <div class="content">
   <div class="ui slider checkbox">
      <input type="checkbox" name="automatic_removal" id="automaticRemoval">
      <label>Automatic removal: Whether the user previous role should be removed whenever they reach a higher role</label>
   </div>
  <br>
  <br>
	<div class="ui form">
	  <div class="field">
		<div class="fields">
		  <div class="twelve wide field">
			<label>Set custom level up message</label>
			<textarea id="CustomLevelUpMsg" placeholder="Level up custom message here" ${selectedServer.database.levelSystem.enabled ? "" : "disabled"}>${selectedServer.database.levelSystem.customNotif}</textarea>
			<div class="sub header disabled"><i class="info circle icon"></i> Any instance of %USER%, %USERNAME%, %USERTAG% and %LEVEL% will respectively be replaced by the mention of the user, the username of the user, the username + discriminator of the user and the level they just reached</div>
		  </div>
		</div>
		<label>Level up notifications target:</label>
		<div class="ui fluid search selection dropdown LevelUpNotificationChannel">
		  <i class="dropdown icon"></i>
		  ${selectedServer.database.levelSystem.levelUpNotif ? '<div class="text">' + (selectedServer.database.levelSystem.levelUpNotif === "dm" 
		  ? 'Direct Message' : (selectedServer.channels.find((c) => c.id === selectedServer.database.levelSystem.levelUpNotif) 
		  ? '#' + selectedServer.channels.find((c) => c.id === selectedServer.database.levelSystem.levelUpNotif).name : (selectedServer.database.levelSystem.levelUpNotif === "channel" ? 'channel' : (selectedServer.database.levelSystem.levelUpNotif ? '#deleted-channel' : 'Disabled')))) + '</div>'
		  : '<div class="default text">Select channel</div>'}
		  <div class="menu" id="LevelUpTargetsList">
					  ${channelOptions(selectedServer)}
					  <div class="item" data-value="dm">Direct Message</div>
					  <div class="item" data-value="channel">Channel</div>
					  <div class="item" data-value="disabled">Disabled</div>
		  </div>
		</div>
		<br>
	    <label>Assigned role(s) when users reach specific requirements:</label>
		<div class="ui middle aligned divided list" id="activityRolesSet">
		 ${selectedServer.database.levelSystem.roles.filter(r => selectedServer.roles.find(role => role.id === r.id)).map(r => `
		 <div class="item" data-value="${r.id}" amount-value="${r.at}" method-value="${r.method}">
		  <div class="right floated content" onclick="this.parentNode.parentNode.removeChild(this.parentNode)">
		   <div class="ui negative labeled icon button">Remove <i class="remove icon"></i></div>
		  </div>
		  <img class="ui avatar image" src="/imgs/${r.method === "experience" ? 'star' : 'mail'}-icon.png" style="border-radius: 0 !important"></img>
		  <div class="content">
			 <a style="color: ${selectedServer.roles.find(role => role.id === r.id).hexColor}">${selectedServer.roles.find(role => role.id === r.id).name}</a> | At: ${r.method === "experience" ? 'Level ' + r.at : r.at + ' messages'}
		  </div>
		</div>`).join("")}
		<div class="ui card" id="newActivityRole">
         <div class="content newActivityRoleCardContent">
          <div class="header">Add new role</div>
		  <div class="description">
		   <div class="ui fluid search selection dropdown ActivityRoles">
		    <i class="dropdown icon"></i>
		    <div class="default text">Select role</div>
		    <div class="menu" id="ActivityRolesTargetsList">
			  ${roleOptions(selectedServer)}
		    </div>
		   </div>
		   <br>
		   <div class="ui fluid search selection dropdown ActivityCountersOptions">
		    <i class="dropdown icon"></i>
		    <div class="default text">Select counter</div>
		    <div class="menu" id="ActivityCountersOptionsList">
		     <div class="item" data-value="experience"><i class="star icon"></i> Level</div>
		     <div class="item" data-value="message"><i class="mail icon"></i> Messages</div>
		    </div>
		  </div>
		  <br>
		  <div class="ui input">
            <input type="text" id="newActivityRoleRequirement" class="txtNum" placeholder="Level or numbers of messages to get this role">
          </div>
         </div>
        </div>
       <div class="extra content">
		 <div class="ui blue right floated labeled icon button" id="addNewActivityRoleRequirement">Add <i class="plus icon"></i></div>
       </div>
       </div>
	</div>
	</div>
  </div>
 </div>
</div>
<div class="actions">
<div class="ui blue button" id="btnExperienceSystem">
  ${selectedServer.database.onEvent.guildMemberAdd.greetings.enabled ? "Disable" : "Enable"}
</div>
<div class="ui negative right labeled icon button">
  Cancel
  <i class="remove icon"></i>
</div>
<div class="ui positive right labeled icon button" id="saveExperienceSettingsButton">
  Save changes
  <i class="checkmark icon"></i>
</div>
</div>
				`);
			}
		});
		document.getElementById("automaticRemoval").addEventListener("click", () => {
			data.levelSystemAutoRemoval = data.levelSystemAutoRemoval ? false : (typeof data.levelSystemAutoRemoval === "undefined" ? selectedServer.database.levelSystem.autoRemove : true);
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

$(document).on("keypress", ".txtNum", function (e) {
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
	selectedServer.database.starboard.minimum = parseInt(document.getElementById('starboardMinimum').value);
	postDataFunc(`/api/guildData`, selectedServer.database);
});

// save prefix
$(document).on("click", "#savePrefixButton", function () {
	const newPrefix = document.getElementById('prefix');
	const prefixField = document.getElementById('setPrefixField');
	const messages = prefixField.querySelectorAll('.pointing');
	//Delete the "invalid input" messages if there is
	for (let i = 0; i < messages.length; i++) {
		prefixField.removeChild(messages[i]);
	}
	if (!newPrefix.value || newPrefix.value.length > 8 || new RegExp(/\s+/gim).test(newPrefix.value)) {
	   const invalidPrefix = document.createElement('div');
	   invalidPrefix.classList = "ui pointing red basic label";
	   invalidPrefix.innerHTML = "The prefix can't be nothing, exceed 8 characters nor can it contains spaces";
       return document.getElementById('setPrefixField').appendChild(invalidPrefix);
	}
	selectedServer.database.generalSettings.prefix = newPrefix.value;
	postDataFunc(`/api/guildData`, selectedServer.database);
});

$(document).on("click", "#moderationModalSettings", function () {
	$('.ui.modal.moderation').modal({
		autofocus: false,
	}).modal('show');

	$('.ui.dropdown.ModerationChannel').dropdown();
});

$(document).on("click", "#saveModerationSettingsButton", function () {
	selectedServer.database.modLog.channel = document.getElementById('modLogTargetsList').getElementsByClassName('selected')[0] ?
	document.getElementById('modLogTargetsList').getElementsByClassName('selected')[0].getAttribute('data-value') : false;
	postDataFunc(`/api/guildData`, selectedServer.database);
});

$(document).on("click", "#levelSystemModalSettings", function () {
	$('.ui.modal.levelSystem').modal({
		autofocus: false,
	}).modal('show');

	if (data.levelSystemAutoRemoval !== selectedServer.database.levelSystem.autoRemove) {
		document.getElementById('automaticRemoval').click();
	}

	$('.ui.dropdown.LevelUpNotificationChannel').dropdown();
	$('.ui.dropdown.ActivityRoles').dropdown();
	$('.ui.dropdown.ActivityCountersOptions').dropdown();
	for (let i = 0; i < document.getElementById("LevelUpTargetsList").children.length; i++) {
		if (document.getElementById("LevelUpTargetsList").children[i].getAttribute('data-value')) {
			if (document.getElementById("LevelUpTargetsList").children[i].getAttribute('data-value') === selectedServer.database.levelSystem.levelUpNotif || (document.getElementById("LevelUpTargetsList").children[i].getAttribute('data-value') === "disabled"  && !selectedServer.database.levelSystem.levelUpNotif)) {
                document.getElementById("LevelUpTargetsList").children[i].classList.add("selected");
			}
		}
	}
});

$(document).on("click", '#addNewActivityRoleRequirement', function() {
	const newActivityRole = document.getElementById('newActivityRole'),
		  targetRole = document.getElementById('ActivityRolesTargetsList').getElementsByClassName('selected')[0],
		  counter = document.getElementById('ActivityCountersOptionsList').getElementsByClassName('selected')[0],
		  requirement = document.getElementById("newActivityRoleRequirement").value;
		  
	if (!targetRole) return newActivityRole.getElementsByClassName('ActivityRoles')[0].classList.add('error');  
	else newActivityRole.getElementsByClassName('ActivityRoles')[0].classList.remove('error');
	if (!counter) return newActivityRole.getElementsByClassName('ActivityCountersOptions')[0].classList.add('error');
	else newActivityRole.getElementsByClassName('ActivityCountersOptions')[0].classList.remove('error');
	if (requirement === "") return document.getElementById("newActivityRoleRequirement").parentNode.classList.add('error');
	else document.getElementById("newActivityRoleRequirement").parentNode.classList.remove('error');
	
	//Check if the role that is gonna be added is already set
	for(let i = 0; i < document.getElementById("activityRolesSet").children.length; i++) {
		if (document.getElementById("activityRolesSet").children[i].getAttribute('data-value') === targetRole.getAttribute('data-value')) {
			if (!document.getElementById("alreadySetRoleErrorMessage")) return $('.content.newActivityRoleCardContent').append(`
			   <div class="ui negative message" id="alreadySetRoleErrorMessage">
			      <i class="close icon" onclick="this.parentNode.parentNode.removeChild(this.parentNode)"></i>
				  <p>This role is already set to be given at some point</p>
			  </div>
			`); else return;
		}
	}
	if (document.getElementById("alreadySetRoleErrorMessage")) {
		document.getElementById("alreadySetRoleErrorMessage").parentNode.removeChild(document.getElementById("alreadySetRoleErrorMessage"));
	}

	$(`#activityRolesSet`).append(`
	<div class="item" data-value="${targetRole.getAttribute('data-value')}" amount-value="${requirement}" method-value="${counter.getAttribute('data-value')}">
	  <div class="right floated content" onclick="this.parentNode.parentNode.removeChild(this.parentNode)">
		<div class="ui negative labeled icon button">Remove <i class="remove icon"></i></div>
	  </div>
	  <img class="ui avatar image" src="/imgs/${counter.getAttribute('data-value') === "experience" ? 'star' : 'mail'}-icon.png" style="border-radius: 0 !important"></img>
	  <div class="content">
		<a style="color: ${selectedServer.roles.find(role => role.id === targetRole.getAttribute('data-value')).hexColor}">${selectedServer.roles.find(role => role.id === targetRole.getAttribute('data-value')).name}</a> | At: ${counter.getAttribute('data-value') === "experience" ? 'Level ' + requirement : requirement + ' messages'}
	  </div>
   </div>
  `)
    document.getElementById('activityRolesSet').appendChild(document.getElementById('newActivityRole')) //fu jquery;
});

$(document).on("click", "#btnExperienceSystem", function () {
	if (!selectedServer.database.onEvent.guildMemberAdd.greetings.enabled) {
		$('#CustomLevelUpMsg').prop("disabled", false);
		document.getElementById("btnExperienceSystem").innerHTML = "Disable";
		$('.ui.dropdown.GreetingChannel').removeClass("disabled");
		selectedServer.database.onEvent.guildMemberAdd.greetings.enabled = true;
	} else {
		$('#CustomLevelUpMsg').prop("disabled", true);
		document.getElementById("btnExperienceSystem").innerHTML = "Enable";
		$('.ui.dropdown.GreetingChannel').addClass("disabled");
		selectedServer.database.onEvent.guildMemberAdd.greetings.enabled = false;
	}
});

$(document).on("click", "#saveExperienceSettingsButton", function () {
	const activityRoles = [];
	for (let i = 0; i < document.getElementById("activityRolesSet").children.length; i++) {
		if (document.getElementById("activityRolesSet").children[i].getAttribute('data-value')) {
			activityRoles.push({
				id: document.getElementById("activityRolesSet").children[i].getAttribute('data-value'),
				at: parseInt(document.getElementById("activityRolesSet").children[i].getAttribute('amount-value')),
				method: document.getElementById("activityRolesSet").children[i].getAttribute('method-value')
			});
		}
	}
	selectedServer.database.levelSystem.roles = activityRoles;
	selectedServer.database.levelSystem.enabled = document.getElementById("btnExperienceSystem").innerHTML === "Disable" ? true : false;
	selectedServer.database.levelSystem.levelUpNotif = document.getElementById("LevelUpTargetsList").getElementsByClassName('selected')[0].getAttribute('data-value') === "disabled" ? false : document.getElementById("LevelUpTargetsList").getElementsByClassName('selected')[0].getAttribute('data-value');
	selectedServer.database.levelSystem.customNotif = document.getElementById("CustomLevelUpMsg").value === "" ? false : document.getElementById("CustomLevelUpMsg").value;
	selectedServer.database.levelSystem.autoRemove = data.levelSystemAutoRemoval;
	postDataFunc(`/api/guildData`, selectedServer.database);
});