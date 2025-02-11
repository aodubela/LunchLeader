Template.login.events({
  "click #join-button": function(event, template) {
    var group = $("#group-input").val();
    var username = $("#username-input").val();

    var userId = Users.insert({
      name: username,
      authenticated: false
    });

    Session.set("currentUserId", userId);

    // If group is duplicate than join exisiting one
    var groupId = Groups.insert({
      name: group,
      users: [userId]
    });

    var mealSessionId = MealSessions.insert({
      day: moment().format("DD-MM-YYYY"),
      groupId: groupId,
      restaurantIds: []
    });

    // var groupId = this.params.groupId;
    return Router.go("/meal/" + mealSessionId + "/choose-restaurant");
  }
})