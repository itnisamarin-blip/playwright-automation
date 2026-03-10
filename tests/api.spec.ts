import { test, expect } from '@playwright/test';

test.describe('Reqres API Testing', () => {

  const headers = {
    'x-api-key': 'pro_f31bcec920f63977597c9c2eb0751311c2ac8b884fe4058638803c355c8e18e4'
  };

  test('Get user profile success', async ({ request }) => {

    const response = await request.get(
      ' https://reqres.in/api/users/12',
      { headers }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data.id).toBe(12);
    expect(body.data.email).toBe('rachel.howell@reqres.in');
    expect(body.data.first_name).toBe('Rachel');
    expect(body.data.last_name).toBe('Howell');
    expect(body.data.avatar).toBe('https://reqres.in/img/faces/12-image.jpg');

  });


  test('Get user profile but user not found', async ({ request }) => {
    const response = await request.get(
      'https://reqres.in/api/users/1234',
      { headers }
    );

    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body).toEqual({});

  });

});