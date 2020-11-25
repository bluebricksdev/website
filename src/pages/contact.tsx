// This page is needed because of: https://www.netlify.com/blog/2020/05/26/add-a-netlify-powered-contact-form-to-your-next.js-site/
// It is called in AJAX so we don't care about the output
// This is just not to get a 404 error

function Contact() {
  return <div>Thank you!</div>;
}
export default Contact;
