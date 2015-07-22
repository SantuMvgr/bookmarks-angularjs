angular.module('categories', [
	'eggly.models.categories'
])
	.config(function($stateProvider) {
		$stateProvider
			.state('eggly.categories', {
				url: '/',
				views: {
					'categories@': {
						templateUrl: 'app/categories/categories.tmpl.html',
						controller: 'CategoriesCtrl'
					},
					'bookmarks@': {
						templateUrl: 'app/categories/bookmarks/bookmarks.tmpl.html',
						controller: 'BookmarksCtrl'
					}
				}
			})
	})
	.controller('CategoriesCtrl', function CategoriesCtrl($scope) {

	});