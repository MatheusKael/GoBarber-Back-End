interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'matheuskael@gobarber.com.br',
      name: 'Matheus Kael do Gobarber',
    },
  },
} as IMailConfig;
