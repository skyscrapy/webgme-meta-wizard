var app = angular.module('webgme_wizard', []);
		app.controller('FormCtrl', function ($scope, $http) {
			$scope.data = {
				projectName: "default",
				branchName: "default",
				manageMeta: "Add",
				manageAttr: "Add",
				addAttrName: "default",
				addAttrVal: "default",
				editAttrVal: "default",
			};
			$scope.submitForm = function() {
				console.log("sending data");
				/* do CRUD operation */
			};
		});