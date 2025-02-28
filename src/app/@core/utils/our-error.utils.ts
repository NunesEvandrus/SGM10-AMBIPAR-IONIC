export class OurError extends Error {
  public ourError = true;
  public originalError: any;
  constructor(message: string, error?: any) {
    super(message);

    this.name = 'OurError';

    if (error) {
      this.originalError = error;
      this.showError(error);
    }
  }

  showError(error: any) {
    console.error(error);
  }
}

export const ExtractErrorMessage = (
  err: Error,
  defaultMessage = 'Por favor, tente novamente.'
) => {
  let msg = err.message;

  if (!(err instanceof OurError)) {
    console.error(err);
    msg = defaultMessage;
  }

  return msg;
};
