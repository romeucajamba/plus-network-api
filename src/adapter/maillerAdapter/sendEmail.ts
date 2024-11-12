import { send } from './emailAdapter'

const sendEmail = (to: string, subject:string, fullName: string, code: number) => {
    let link, res;
    switch (subject) {
        case "password":
             link=` Olá <b>${fullName}</b>,

             <p> Bem-vindo(a) à Plus Network! Estamos muito felizes em tê-lo(a) conosco. </p>
             
            <p> Para redefinir a sua senha, por favor, utilize o código de ativação abaixo.</p>
             
             <h2> Código de activação : <h2>${code}</h2></h2>
             
             <p> Por favor, insira este código na tela de ativação para concluir o processo de registro.</p>
             
            <p> Se você não solicitou este código, por favor, ignore este email ou entre em contato com o suporte ao cliente.</p>
             
             <p>
             <b> Atenciosamente,</b>  
             <b> Equipa de suporte PlusNetwork</b>
             <b>geral@gmail.com </b>
             <b> Whatsapp:+244943558106</b>
             </p> 
         `
             res = send(to,"Redifinir palavra-passe",link)
           return res
        break;
        case "candidatura":
            link=` Olá <b>${fullName}</b>,          
            
            <p> A sua candidatura foi enviada com sucesso.</p>
            
            <p>
            <b> Atenciosamente,</b>  
            <b> Equipa de suporte PlusNetwork</b>
            <b>geral@gmail.com </b>
            <b> Whatsapp:+244943558106</b>
            </p> 
        `
            res = send(to,"Candidatura",link)
          return res
       break;   
    }

}

export { sendEmail }