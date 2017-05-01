var myApp = angular.module('bundlesApp', ['customRestClient']);

angular.module('bundlesApp').controller('dealsCtrl', ['$scope', 'restClient', function ($scope, restClient) {


    $scope.getDeals = function () {
        restClient.get('/Deals/GetDeals').success(function (response) {
            $scope.deals = response.deals;
        }).error(function () {
            console.log('error');
        });
    }

    $scope.typeFilter = function (item) {
        var filterArray = [];
        for (var i in $scope.filters.type) {
            if ($scope.filters.type[i])
                filterArray.push(i);
        }

        if (filterArray.length > 0) {
            return filterArray.every(elem => item.productTypes.indexOf(elem) > -1);
        }
        else {
            return true;
        }
    };

    $scope.mobileFilter = function (item) {
        if ($scope.filters.mobile != '') {
            if (item.mobile === null ||
                $scope.filters.mobile != item.mobile.data.label) {
                return false;
            }
        }
        return true;
    };

    $scope.init = function () {
        $scope.filters =
            {
                type: {},
                speed: '',
                mobile: ''
            }
        $scope.getDeals();
    };
}]);