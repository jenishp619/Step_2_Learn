export const PasswordReset = (link: string) => {
  return `
    
    It seems like you forgot your password for StepToLearn. If this is true, click the link below to reset your password.

    Reset my password ${link}

    If you did not forget your password, please disregard this email.`;
};
