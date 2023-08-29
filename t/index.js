const axios = require('axios');
 
const cookie =
  'session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkwWWpGa1lqSXhNbUZrWmprek1HRm1NRFkwWVdGaE5pSXNJbVZ0WVdsc0lqb2lkR1Z6ZERSQWRHVnpkQzVqYjIwaUxDSnBZWFFpT2pFMk9Ea3pOemMxTmpsOS5Fd2taQ0lHeWJYY1FMT240cXIzMEd4Vi1Jd3ZDa0lhWVVsMWxPSm5QQzBNIn0=; Path=/; Secure; HttpOnly;';
 
const doRequest = async (id) => {
  const { data } = await axios.post(
    `http://ticketing.dev/api/tickets`,
    { title: `ticket${id}`, price: 5 },
    {
      headers: { cookie },
    }
  );
 
  await axios.put(
    `http://ticketing.dev/api/tickets/${data.id}`,
    { title: `ticket${id}`, price: 10 },
    {
      headers: { cookie },
    }
  );
 
  axios.put(
    `http://ticketing.dev/api/tickets/${data.id}`,
    { title: `ticket${id}`, price: 15 },
    {
      headers: { cookie },
    }
  );
 
  console.log('Request complete');
};
 
(async () => {
  for (let i = 0; i < 200; i++) {
    doRequest(i+1);
  }
})();