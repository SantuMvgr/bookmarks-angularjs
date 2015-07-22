var app = angular.module('eggly', [
	'ui.router',
	'categories',
	'categories.bookmarks'
]);

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('eggly', {
			url: '',
			abstract: true
		});
	$urlRouterProvider.otherwise('/');
});

app.controller('MainCtrl', ['$scope', function($scope) {
	$scope.categories = [
		{id:1, name:"Education"},
		{id:2, name:"Entertainment"},
		{id:3, name:"Leisure"},
		{id:4, name:"Sports"}
	];

	$scope.bookmarks = [
		{id:1, url: "www.reddit.com", title: "Reddit", category:"Leisure"},
		{id:2, url: "www.espn.com", title: "ESPN", category:"Sports"},
		{id:3, url: "www.egghead.io", title: "Egghead.io", category:"Education"},
		{id:4, url: "www.angularjs.com", title: "AngularJS", category:"Education"},
		{id:5, url: "www.youtube.com", title: "Youtube", category:"Entertainment"},
		{id:6, url: "www.mongodb.org", title: "MongoDB", category:"Education"},
		{id:7, url: "www.facebook.com", title: "Facebook", category:"Leisure"},
		{id:8, url: "www.cnn.com", title: "CNN", category:"Entertainment"}
	];

	$scope.currentCategory = null;

	function setCurrentCategory(category) {
		$scope.currentCategory = category;

		cancelCreating();
		cancelEditing();
	}

	function isCurrentCategory(category) {
		return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
	}

	$scope.setCurrentCategory = setCurrentCategory;
	$scope.isCurrentCategory = isCurrentCategory;

	/*----------------------CRUD-----------------------------*/

	function resetCreateForm() {
		$scope.newBookmark = {
			title: '',
			url: '',
			category: $scope.currentCategory
		}
	}

	function createBookmark(bookmark) {
		bookmark.id = $scope.bookmarks.length;
		bookmark.category = $scope.currentCategory.name;
		$scope.bookmarks.push(bookmark);

		resetCreateForm();
	}

	$scope.createBookmark = createBookmark;

	$scope.editedBookmark = null;

	function setEditedBookmark(bookmark) {
		$scope.editedBookmark = angular.copy(bookmark);
	}

	$scope.setEditedBookmark = setEditedBookmark;

	function updateBookmark(bookmark) {
		var index = _.findIndex($scope.bookmarks, function(b) {
			return b.id == bookmark.id; 
		});
		$scope.bookmarks[index] = bookmark;

		$scope.editedBookmark = null;
		$scope.isEditing = false;
	}

	$scope.updateBookmark = updateBookmark;

	function isSelectedBookmark(bookmarkId) {
		return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
	}

	$scope.isSelectedBookmark = isSelectedBookmark;

	function deleteBookmark(bookmark) {
		_.remove($scope.bookmarks, function(b) {
			return b.id == bookmark.id;
		});
	}

	$scope.deleteBookmark = deleteBookmark;

	/*----------------------CREATING AND EDITING STATES-----------------------------*/

	$scope.isCreating = false;
	$scope.isEditing = false;

	function startCreating() {
		$scope.isCreating = true;
		$scope.isEditing = false;

		resetCreateForm();
	}

	function cancelCreating() {
		$scope.isCreating = false;
	}

	function startEditing() {
		$scope.isCreating = false;
		$scope.isEditing = true;
	}

	function cancelEditing() {
		$scope.isEditing = false;
	}

	function shouldShowCreating() {
		return $scope.currentCategory && !$scope.isEditing;
	}

	function shouldShowEditing() {
		return $scope.isEditing && !$scope.isCreating;
	}

	$scope.startCreating = startCreating;
	$scope.cancelCreating = cancelCreating;
	$scope.startEditing = startEditing;
	$scope.cancelEditing = cancelEditing;
	$scope.shouldShowCreating = shouldShowCreating;
	$scope.shouldShowEditing = shouldShowEditing;

}]);