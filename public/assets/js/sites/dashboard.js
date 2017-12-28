$(document).ready(function () {
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
    const postData = $.post({
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
  var data = "";
  var guild = {
    icon: [],
  };
  var user = {
    icon: "",
  };
  $(document).ready(function () {
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

      _map.forEach((product) => {
        if (product.icon === null) {
          guild.icon.push(
            "https://semantic-ui.com/images/wireframe/square-image.png"
          );
        } else {
          guild.icon.push(
            `https://cdn.discordapp.com/icons/${product.id}/${
              product.icon
            }.png`
          );
        }
      })


      setTimeout(function () {
        $("#userContent").append(`
			<div class="ui fluid cards">
			<div class="card">
				<div class="content">
					<div class="header">
						<img class="ui avatar image" src=${user.icon}>${data.userinfo.user.username}#${data.userinfo.user.discriminator}
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
							Discard changes
							<i class="trash outline icon"></i>
						</div>
						<div class="ui positive right labeled icon button" id="savePrivacySettingsButton">
							Save changes
							<i class="checkmark icon"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
				`)
      }, 0)
      // adding items for dropdown (servers)
      setTimeout(() => {
        _map.forEach((product, index) => {
          $("#menu").append(`
		<div class="item" data-value=${product.id}>
			<img class="ui circular image flag" src=${guild.icon[index]}> ${product.name}
		</div>
		`)
        })
        $("#menu").dropdown("refresh");
      }, 0);
    });
  });
  // adding click events in the dom when the content has been generated
  $(document).on("click", "#privacyModal", function () {
    displayModal();
  });
  $(document).on("click", "#updateCheckboxes", function () {
    updateCheckboxes();
  });
  $(document).on("click", "#savePrivacySettingsButton", function () {
    updatePrivacySettings();
  });
});
