(function (window, angular, undefined) {

    angular.module('customRestClient', [])
        .factory('restClient', ['$http',
            function ($http) {
                var restClient = {
                    get: function (action, options, headers, type) {
                        return restClient.request(action, 'params', options, headers, 'GET', type);
                    },
                    request: function (action, optionType, options, headers, verb, type) {
                        var httpObj,
                            resType;

                        resType = type || 'json';
                        headers = restClient.getCompleteRequestData(headers);
                        options = restClient.getCompleteRequestData(options);
                        httpObj = {
                            method: verb,
                            url: action,
                            responseType: resType,
                            headers: headers
                        };

                        httpObj[optionType] = options;
                        return $http(httpObj);

                    },
                    getCompleteRequestData: function (options) {
                        return angular.isObject(options) ? options : {};
                    }
                };

                return restClient;
            }
        ]);

}(window, window.angular));
