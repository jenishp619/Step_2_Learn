import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51LNdaQD0RJc9NS6U86HxxL8NujFKfOtrCAGhaAZWrl9I6IVijqHWQ6Bp0DnWsGvcARgcZhHk0sIR3d8U0SleeBBp00wo6HYUBc',
  { typescript: true, apiVersion: '2020-08-27' },
);

export default stripe;
