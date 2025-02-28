[
  {
    Key: 'Nome',
    Type: ControlType.INPUT,
    Params: {
      Label: 'Nome',
      Placeholder: 'Ex. João da Silva',
      Validators: [Validators.required],
      Type: InputType.TEXT,
    },
    ColSize: {
      Size: 6,
    },
  },
  {
    Key: 'Email',
    Type: ControlType.INPUT,
    Params: {
      Label: 'E-mail',
      Placeholder: 'Ex. joao@email.com',
      Validators: [Validators.required, Validators.email],
      Type: InputType.EMAIL,
    },
    ColSize: {
      Size: 6,
    },
  },
  {
    Key: 'Idade',
    Type: ControlType.INPUT,
    Params: {
      Label: 'Idade',
      Placeholder: 'Ex. 23',
      Validators: [Validators.required],
      Type: InputType.NUMBER,
    },
    ColSize: {
      Size: 6,
    },
  },
  {
    Key: 'Telefone',
    Type: ControlType.INPUT,
    Params: {
      Label: 'Telefone',
      Placeholder: 'Ex. (15) 98765-4321',
      Validators: [Validators.required],
      Type: InputType.TEL,
    },
    ColSize: {
      Size: 6,
    },
  },
  {
    Key: 'Ativo',
    Type: ControlType.BOOLEAN,
    Params: {
      Label: 'Ativo',
      Validators: [Validators.required],
    },
    ColSize: {
      Size: 6,
    },
  },
  {
    Key: 'Senha',
    Type: ControlType.INPUT,
    Params: {
      Label: 'Senha',
      Placeholder: '•••••',
      Validators: [Validators.required],
      Type: InputType.PASSWORD,
    },
    ColSize: {
      Size: 6,
    },
  },
]
