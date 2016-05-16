import _ from 'lodash';
import request from 'request-promise';

class FacebookApi {
  constructor() {
    this._setup();
  }

  _setup(options) {
    this.baseEndPoint = 'https://graph.facebook.com';
  }

  _throwError(desc) {
    throw new Error(desc);
  }

  _get(uri) {
    if (!uri) {
      this._throwError('FacebookApi is missing required arguments');
    }

    const requestOptions = { uri, json: true };

    return request(requestOptions);
  }

  formatPageData(pageData, periods, filterFields) {
    const formattedData = {};

    periods.forEach((period) => {
      const filteredPageData = pageData.filter(metric => metric.period === period);

      formattedData[period] = filteredPageData.map((metric) => {
        const mostRecentMetricValueObject = metric.values[metric.values.length - 1];
        const formattedMetric = {
          name: metric.name,
          title: metric.title,
          value: mostRecentMetricValueObject.value,
        };

        return formattedMetric;
      });

      if (filterFields) {
        formattedData[period] = formattedData[period].filter(
          metric => _.includes(filterFields, metric.name)
        );
      }
    });

    return formattedData;
  }

  getPageData(pageId, pageToken) {
    const uri = `${this.baseEndPoint}/${pageId}/insights/?access_token=${pageToken}`;

    return this._get(uri);
  }

  getUserPages(longTermToken) {
    const formattedToken = longTermToken.split('=').pop();
    const uri = `${this.baseEndPoint}/me/accounts?access_token=${formattedToken}`;

    return this._get(uri);
  }

  get60DayUserToken(appId, appSecret, tempToken) {
    const uri = (
      `${this.baseEndPoint}/oauth/access_token?grant_type=fb_exchange_token&` +
      `client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${tempToken}`
    );

    return this._get(uri);
  }
}

exports.FacebookApi = FacebookApi;
