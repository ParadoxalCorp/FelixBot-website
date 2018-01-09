// update settingsFunc
// eslint-disable-next-line no-unused-vars
const postDataFunc = (url, data) => $.post({
	url: url,
	data: JSON.stringify(data),
	dataType: "json",
	contentType: "application/json",
	sucess: null,
}).done(() => {
	$("#userSettingsContainer").append(`
	<div class="ui positive message">
		<i class="close icon"></i>
		<div class="header">
			Success
		</div>
		<p>Successfully updated your settings</p>
	</div>
`);
	$(".message .close").on("click", function () {
		$(this)
			.closest(".message")
			.transition("fade");
	});
}).fail(() => {
	// console.error(error);
	$("#userSettingsContainer").append(`
			<div class="ui negative message">
<i class="close icon"></i>
<div class="header">
Awww, something bad occurred :v
</div>
<p>Failed to update your settings
</p></div>
	`);
	$(".message .close").on("click", function () {
		$(this)
			.closest(".message")
			.transition("fade");
	});
})

// functions

const roleOptions = selectedServer => (
	`${selectedServer.roles.map(product => product.name !== "@everyone" && product.managed === false ? `
	<option class="item" data-value=${product.id}>${product.name}</option>` : "").join("")}`
);
const channelOptions = selectedServer => (
	`${selectedServer.channels.map(product => product.type === 0 ? `
		<div class="item" data-value="${product.id}">${product.name}</div>` : "").join("")}`
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

const updatePrivacySettings = async function () {
	document.getElementById("savePrivacySettingsButton").classList.add("loading");
	$("#body").append(`
		<div class="ui segment" id="savingNotice">
			<div class="ui active dimmer">
					<div class="ui indeterminate text loader">Saving...</div>
			</div>
		</div>
	`);

	document
		.getElementById("savingNotice")
		.appendChild(document.getElementById("pusher"));
	document
		.getElementById("savingNotice")
		.appendChild(document.getElementById("footer"));
	data.dataPrivacy = data.editedPrivacySettings;
	// eslint-disable-next-line no-unused-vars
	const postData = $.post({ // deepscan-disable-line UNUSED_DECL
		url: "/api/userData",
		data: JSON.stringify(data),
		dataType: "json",
		contentType: "application/json",
		sucess: null,
	})
		.done(() => {
			$("#userSettingsContainer").append(`
			<div class="ui positive message">
				<i class="close icon"></i>
				<div class="header">
					Success
				</div>
				<p>Successfully updated your settings</p>
			</div>
		`);

			$(".message .close").on("click", function () {
				$(this)
					.closest(".message")
					.transition("fade");
			});
		})
		.fail(() => {
			// console.error(error);
			$("#userSettingsContainer").append(`
					<div class="ui negative message">
<i class="close icon"></i>
<div class="header">
Awww, something bad occurred :v
</div>
<p>Failed to update your settings
</p></div>
			`);
			$(".message .close").on("click", function () {
				$(this)
					.closest(".message")
					.transition("fade");
			});
		})
		.always(() => {
			document
				.getElementById("savePrivacySettingsButton")
				.classList.remove("loading");
			let pusher = document.getElementById("pusher"),
				footer = document.getElementById("footer");
			document
				.getElementById("savingNotice")
				.removeChild(document.getElementById("pusher"));
			document
				.getElementById("savingNotice")
				.removeChild(document.getElementById("footer"));
			$("#savingNotice").remove();
			document.getElementById("body").appendChild(pusher);
			document.getElementById("body").appendChild(footer);
		});
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
								<input type="text" name="setFarewell" id="FarewellMsg" placeholder="farewell message here" ${selectedServer.database.onEvent.guildMemberRemove.farewell.enabled	? "" : "disabled"}>
							</div>
						</div>
						<label>Targeted channel:</label>
						<div class="ui fluid search selection dropdown FarewellChannel">
						<i class="dropdown icon"></i>
							<div class="default text">Select channel</div>
							<div class="menu">
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
			<div class="ui negative button" id="updateCheckboxes">
				Discard changes <i class="trash outline icon"></i>
			</div>
			<div class="ui positive right labeled icon button" id="savePrivacySettingsButton">
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
              <input type="text" name="setGreeting" id="GreetMsg" placeholder="greeting message here" ${selectedServer.database.onEvent.guildMemberAdd.greetings.enabled ? "" : "disabled"}>
            </div>
          </div>
          <label>Targeted channel:</label>
          <div class="ui fluid search selection dropdown GreetingChannel">
            <i class="dropdown icon"></i>
            <div class="default text">Select channel</div>
            <div class="menu">
						${channelOptions(selectedServer)}
            </div>
					</div>
					<label>Assigned role(s) when user joins:</label>
					<div class="ui fluid search multiple selection dropdown roleoptions" multiple="">
						<input type="hidden" name="roles">
						<i class="dropdown icon"></i>
						<input class="search" autocomplete="off">
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
    <div class="ui negative button" id="updateCheckboxes">
      Discard changes
      <i class="trash outline icon"></i>
    </div>
    <div class="ui positive right labeled icon button" id="savePrivacySettingsButton">
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
					<div class="default text">Select starboard channel</div>
					<div class="menu">
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
	<div class="ui negative button" id="updateCheckboxes">
		Discard changes
		<i class="trash outline icon"></i>
	</div>
	<div class="ui positive right labeled icon button" id="saveStarboardSettingsBtn">
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
	updatePrivacySettings();
});

// farewell settings

$(document).on("click", "#btnFarewellMsg", function () {
	if ((document.getElementById("btnFarewellMsg").innerHTML) === "Disable") {
		$('#FarewellMsg').prop("disabled", true);
		document.getElementById("btnFarewellMsg").innerHTML = "Enable"
		$('.ui.dropdown.FarewellChannel').addClass("disabled")
		selectedServer.database.onEvent.guildMemberRemove.farewell.enabled = false;
	} else {
		$('#FarewellMsg').prop("disabled", false);
		document.getElementById("btnFarewellMsg").innerHTML = "Disable";
		$('.ui.dropdown.FarewellChannel').removeClass("disabled")
		selectedServer.database.onEvent.guildMemberRemove.farewell.enabled = true;
	}
});

$(document).on("click", "#farewellModalSettings", function () {
	$('.ui.modal.farewell').modal({
		autofocus: false,
	}).modal('show');

	$('.ui.dropdown.FarewellChannel').dropdown();
	selectedServer.database.onEvent.guildMemberRemove.farewell.enabled === false ? $('.ui.dropdown.FarewellChannel').addClass("disabled") : null;
});

// greetings settings

$(document).on("click", "#btnGreetMsg", function () {
	if ((document.getElementById("btnGreetMsg").innerHTML) === "Disable") {
		$('#GreetMsg').prop("disabled", true);
		document.getElementById("btnGreetMsg").innerHTML = "Enable"
		$('.ui.dropdown.GreetingChannel').addClass("disabled")
		selectedServer.database.onEvent.guildMemberAdd.greetings.enabled = false
	} else {
		$('#GreetMsg').prop("disabled", false);
		document.getElementById("btnGreetMsg").innerHTML = "Disable"
		$('.ui.dropdown.GreetingChannel').removeClass("disabled")
		selectedServer.database.onEvent.guildMemberAdd.greetings.enabled = true
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
	})
});

// starboard settings

$(document).on("click", "#starboardSettings", function () {
	if ((document.getElementById("starboardSettings").innerHTML) === "Disable") {
		$('#GreetMsg').prop("disabled", true);
		document.getElementById("starboardSettings").innerHTML = "Enable"
		$('.ui.dropdown.GreetingChannel').addClass("disabled")
		selectedServer.database.onEvent.guildMemberAdd.greetings.enabled = false
	} else {
		$('#GreetMsg').prop("disabled", false);
		document.getElementById("starboardSettings").innerHTML = "Disable"
		$('.ui.dropdown.GreetingChannel').removeClass("disabled")
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

// save greeting settings

$(document).on("click", "#saveStarboardSettingsBtn", function () {
	selectedServer.database.onEvent.guildMemberAdd.greetings.message = $(".dropdown.fluid.server").dropdown("get value")
})
