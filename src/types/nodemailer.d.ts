declare module 'nodemailer' {
  const nodemailer: {
    createTransport: (config: any) => any
  }
  export default nodemailer
}
