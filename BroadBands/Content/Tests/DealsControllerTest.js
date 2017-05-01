'use strict';

describe('dealsCtrl', function () {
    var controller,
        $scope = {},
        mockRestClient,
        mockPromise,
        mockResponse = {
            'title': 'mockTitle',
            'mobile': null,
            'speed': {
                'label': 'mockLabel'
            }
        };

    beforeEach(angular.mock.module('bundlesApp'));

    beforeEach(inject(function (_$controller_, _restClient_) {

        mockRestClient = {
            get: function () {
                return {
                    success: function () {
                        return {
                            error: mockPromise.error
                        };
                    }
                };
            }
        };

        mockPromise = {
            success: function (fn) {
                fn(mockResponse);
            },
            error: function (fn) {
                fn(mockResponse);
            }
        };

        controller = _$controller_('dealsCtrl', {
            '$scope': $scope,
            'restClient': mockRestClient
        });

        spyOn(mockRestClient, 'get').and.callThrough();
        spyOn(mockPromise, 'error').and.callFake(function () {
            return true;
        });
    }));


    // tests start here
    it('should be defined', function () {
        expect(controller).toBeDefined();
    });

    describe('$scope.init', function () {
        it('should be defined', function () {
            expect($scope.init).toBeDefined();
        });

        it('should initialize filters', function () {
            var expectedFilters =
                {
                    type: {},
                    speed: '',
                    mobile: ''
                }

            $scope.init();

            expect($scope.filters).toEqual(expectedFilters);
        });

        it('should call getDeals', function () {
            spyOn($scope, 'getDeals').and.callFake(function () {
                return false;
            });

            $scope.init();

            expect($scope.getDeals).toHaveBeenCalled();
        });
    });

    describe('$scope.getDeals', function () {
        it('should be defined', function () {
            expect($scope.getDeals).toBeDefined();
        });

        it('should call restClient', function () {
            $scope.getDeals();
            expect(mockRestClient.get).toHaveBeenCalled();
        });
    });

    describe('$scope.typeFilter', function () {
        it('should be defined', function () {
            expect($scope.typeFilter).toBeDefined();
        });

        it('should return true if filters are null', function () {
            $scope.filters =
                {
                    type: null
                }
            var item = {};

            expect($scope.typeFilter(item)).toEqual(true);
        });

        it('should return true if item productTypes are in filters', function () {
            $scope.filters =
                {
                    type: {
                        filterOne: true
                    }
                }
            var item = {
                productTypes: ['filterOne', 'filterTwo']
            };

            expect($scope.typeFilter(item)).toEqual(true);
        });

        it('should return true if item productTypes are in multiple filters', function () {
            $scope.filters =
                {
                    type: {
                        filterOne: true,
                        filterTwo: true,
                    }
                }
            var item = {
                productTypes: ['filterOne', 'filterTwo']
            };

            expect($scope.typeFilter(item)).toEqual(true);
        });

        it('should return false if item productTypes are not in filters', function () {
            $scope.filters =
                {
                    type: {
                        filterOne: true
                    }
                }
            var item = {
                productTypes: ['filterTwo']
            };

            expect($scope.typeFilter(item)).toEqual(false);
        });

        it('should return false if item productTypes are not in multiple filters', function () {
            $scope.filters =
                {
                    type: {
                        filterOne: true,
                        filterTwo: true,
                    }
                }
            var item = {
                productTypes: ['filterOne']
            };

            expect($scope.typeFilter(item)).toEqual(false);
        });
    });

    describe('$scope.mobileFilter', function () {
        it('should be defined', function () {
            expect($scope.mobileFilter).toBeDefined();
        });

        it('should return false if item.mobile is null', function () {
            $scope.filters =
                {
                    mobile: ['filterOne']
                }
            var item = {
                mobile: null
            };

            expect($scope.mobileFilter(item)).toEqual(false);
        });

        it('should return true if filters are null', function () {
            $scope.filters =
                {
                    mobile: ''
                }
            var item = {
                mobile: {}
            };

            expect($scope.mobileFilter(item)).toEqual(true);
        });

        it('should return true if item item.mobile.data are in filters', function () {
            $scope.filters =
                {
                    mobile: ['filterOne']
                }
            var item = {
                mobile: {
                    data:
                    {
                        label: 'filterOne'
                    }
                }
            };

            expect($scope.mobileFilter(item)).toEqual(true);
        });

        it('should return false if item item.mobile.data not in filters', function () {
            $scope.filters =
                {
                    mobile: ['filterOne']
                }
            var item = {
                mobile: {
                    data:
                    {
                        label: 'filterTwo'
                    }
                }
            };

            expect($scope.mobileFilter(item)).toEqual(false);
        });
    });
});
