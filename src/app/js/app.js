/**
 * Created by steven on 11/29/15.
 */
var wizardApp = angular.module('webgmeWizard', [
    'ngRoute',
    'wizardControllers'
]);

wizardApp.dataModel = {
    projects: null,
    branches: null,
    selectedProject: null,
    selectedBranch: null,
    selectedNode: null
};

wizardApp.client = null;
wizardApp.userId = null;

wizardApp.run(function () {
    console.log('app run..');

    wizardApp.gmeInit();
});

wizardApp.gmeInit = function () {
    console.log('gme init..');
    var client = new GME.classes.Client(GME.gmeConfig);

    client.connectToDatabase(function (err) {
        if (err) {
            console.log(err);
        }
        wizardApp.client = client;
        console.log('client', wizardApp.client);
        wizardApp.client.getProjectsAndBranches(false, function (err, myProjects) {
            if (err) {
                console.log(err);
            }
            wizardApp.dataModel.projects = myProjects;
        });
    });
};

wizardApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/index', {
                templateUrl: 'partials/index.html',
                controller: 'IndexCtrl'
            }).
            when('/newProject', {
                templateUrl: 'partials/new-project.html',
                controller: 'NewProjectCtrl'
            }).
            when('/newBranch', {
                templateUrl: 'partials/new-branch.html',
                controller: 'NewBranchCtrl'
            }).
            when('/newModel', {
                templateUrl: 'partials/new-model.html',
                controller: 'NewModelCtrl'
            }).
            when('/openProject', {
                templateUrl: 'partials/open-project.html',
                controller: 'OpenProjectCtrl'
            }).
            when('/attributes', {
                templateUrl: 'partials/attributes.html',
                controller: 'AttributeCtrl'
            });
            //.
            //otherwise({
            //    redirectTo: '/index'
            //});
    }]);