import {Session} from '../../../auth/session';
import {Context} from '../../../context';
import {ApiVersion} from '../../../base-types';

import {ApplicationCharge} from '../../2021-10';

describe('ApplicationCharge resource', () => {
  const domain = 'test-shop.myshopify.io';
  const headers = {'X-Shopify-Access-Token': 'this_is_a_test_token'};
  const test_session = new Session('1234', domain, '1234', true);
  test_session.accessToken = 'this_is_a_test_token';

  beforeEach(() => {
    Context.API_VERSION = ApiVersion.October21;
  });

  it('test_1', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({"application_charge": {"id": 1017262365, "name": "Super Duper Expensive action", "api_client_id": 755357713, "price": "100.00", "status": "pending", "return_url": "http://super-duper.shopifyapps.com/", "test": null, "created_at": "2022-02-03T17:00:37-05:00", "updated_at": "2022-02-03T17:00:37-05:00", "charge_type": null, "decorated_return_url": "http://super-duper.shopifyapps.com/?charge_id=1017262365", "confirmation_url": "https://jsmith.myshopify.com/admin/charges/1017262365/confirm_application_charge?signature=BAh7BzoHaWRpBB0xojw6EmF1dG9fYWN0aXZhdGVU--c65c9a4c3e9f9c78448bd1e8c3cab9a0ac240c86"}}));

    const application_charge = new ApplicationCharge({session: test_session});
    application_charge.name = "Super Duper Expensive action";
    application_charge.price = 100.0;
    application_charge.return_url = "http://super-duper.shopifyapps.com";
    await application_charge.save({});

    expect({
      method: 'POST',
      domain,
      path: '/admin/api/2021-10/application_charges.json',
      query: '',
      headers,
      data: { "application_charge": {"name": "Super Duper Expensive action", "price": 100.0, "return_url": "http://super-duper.shopifyapps.com"} }
    }).toMatchMadeHttpRequest();
  });

  it('test_2', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({"application_charge": {"id": 1017262366, "name": "Super Duper Expensive action", "api_client_id": 755357713, "price": "100.00", "status": "pending", "return_url": "http://super-duper.shopifyapps.com/", "test": true, "created_at": "2022-02-03T17:00:39-05:00", "updated_at": "2022-02-03T17:00:39-05:00", "charge_type": null, "decorated_return_url": "http://super-duper.shopifyapps.com/?charge_id=1017262366", "confirmation_url": "https://jsmith.myshopify.com/admin/charges/1017262366/confirm_application_charge?signature=BAh7BzoHaWRpBB4xojw6EmF1dG9fYWN0aXZhdGVU--ef747ae7283a52e94e47a4b0b3140e348319fe94"}}));

    const application_charge = new ApplicationCharge({session: test_session});
    application_charge.name = "Super Duper Expensive action";
    application_charge.price = 100.0;
    application_charge.return_url = "http://super-duper.shopifyapps.com";
    application_charge.test = true;
    await application_charge.save({});

    expect({
      method: 'POST',
      domain,
      path: '/admin/api/2021-10/application_charges.json',
      query: '',
      headers,
      data: { "application_charge": {"name": "Super Duper Expensive action", "price": 100.0, "return_url": "http://super-duper.shopifyapps.com", "test": true} }
    }).toMatchMadeHttpRequest();
  });

  it('test_3', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({"application_charge": {"id": 675931192, "name": "iPod Cleaning", "api_client_id": 755357713, "price": "5.00", "status": "accepted", "return_url": "http://google.com", "test": null, "created_at": "2022-02-03T16:53:36-05:00", "updated_at": "2022-02-03T16:53:36-05:00", "charge_type": null, "decorated_return_url": "http://google.com?charge_id=675931192"}}));

    await ApplicationCharge.find({
      session: test_session,
      id: 675931192,
    });

    expect({
      method: 'GET',
      domain,
      path: '/admin/api/2021-10/application_charges/675931192.json',
      query: '',
      headers,
      data: null
    }).toMatchMadeHttpRequest();
  });

  it('test_4', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({"application_charges": [{"id": 675931192, "name": "iPod Cleaning", "api_client_id": 755357713, "price": "5.00", "status": "accepted", "return_url": "http://google.com", "test": null, "created_at": "2022-02-03T16:53:36-05:00", "updated_at": "2022-02-03T16:53:36-05:00", "charge_type": null, "decorated_return_url": "http://google.com?charge_id=675931192"}, {"id": 1017262346, "name": "Create me a logo", "api_client_id": 755357713, "price": "123.00", "status": "accepted", "return_url": "http://google.com", "test": null, "created_at": "2022-02-03T16:53:36-05:00", "updated_at": "2022-02-03T16:53:36-05:00", "charge_type": "brokered_service", "decorated_return_url": "http://google.com?charge_id=1017262346"}]}));

    await ApplicationCharge.all({
      session: test_session,
      since_id: "556467234",
    });

    expect({
      method: 'GET',
      domain,
      path: '/admin/api/2021-10/application_charges.json',
      query: 'since_id=556467234',
      headers,
      data: null
    }).toMatchMadeHttpRequest();
  });

  it('test_5', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({"application_charges": [{"id": 1017262346, "name": "Create me a logo", "api_client_id": 755357713, "price": "123.00", "status": "accepted", "return_url": "http://google.com", "test": null, "created_at": "2022-02-03T16:53:36-05:00", "updated_at": "2022-02-03T16:53:36-05:00", "charge_type": "brokered_service", "decorated_return_url": "http://google.com?charge_id=1017262346"}, {"id": 556467234, "name": "Green theme", "api_client_id": 755357713, "price": "120.00", "status": "accepted", "return_url": "http://google.com", "test": null, "created_at": "2022-02-03T16:53:36-05:00", "updated_at": "2022-02-03T16:53:36-05:00", "charge_type": "theme", "decorated_return_url": "http://google.com?charge_id=556467234"}, {"id": 675931192, "name": "iPod Cleaning", "api_client_id": 755357713, "price": "5.00", "status": "accepted", "return_url": "http://google.com", "test": null, "created_at": "2022-02-03T16:53:36-05:00", "updated_at": "2022-02-03T16:53:36-05:00", "charge_type": null, "decorated_return_url": "http://google.com?charge_id=675931192"}]}));

    await ApplicationCharge.all({
      session: test_session,
    });

    expect({
      method: 'GET',
      domain,
      path: '/admin/api/2021-10/application_charges.json',
      query: '',
      headers,
      data: null
    }).toMatchMadeHttpRequest();
  });

});
