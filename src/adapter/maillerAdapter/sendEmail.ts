import { send } from './emailAdapter'

const sendEmail = (to: string, subject:string, name: string, code: number)=>{
    let link, res;
    switch (subject) {
        case "ativation":
             link=` Olá <b>${name}</b>,

             <p> Bem-vindo(a) à Resolva Angola! Estamos muito felizes em tê-lo(a) conosco. </p>
             
            <p> Para ativar sua conta, por favor, utilize o código de ativação abaixo.</p>
             
             <h2> Código de activação : <h2>${code}</h2></h2>
             
             <p> Por favor, insira este código na tela de ativação para concluir o processo de registro.</p>
             
            <p> Se você não solicitou este código, por favor, ignore este email ou entre em contato com o suporte ao cliente.</p>
             
             <p>
             <b> Atenciosamente,</b>  
             <b> Equipa de suporte do Resolva Angola</b>
             <b>resolvaangola@gmail.com </b>
             <b> Whatsapp:+244934528102</b>
             </p> 
         `
             res = send(to,"Ativação da conta",link)
           return res
        break;
        case "password":
            link=` Olá <b>${name}</b>,

            <p> Bem-vindo(a) à Resolva Angola! Estamos muito felizes em ajudar-te. </p>
            
           <p> Para redefinir a sua senha, por favor, utilize o código abaixo.</p>
            
            <h2> Código de verificação : <h2>${code}</h2></h2>
            
            <p> Por favor, insira este código na tela de Verificação para concluir o processo de redefinição da senha.</p>
            
           <p> Se você não solicitou este código, por favor, ignore este email ou entre em contato com o suporte ao cliente.</p>
            
            <p>
            <b> Atenciosamente,</b>  
            <b> Equipa de suporte do Resolva Angola</b>
            <b>resolvaangola@gmail.com </b>
            <b> Whatsapp:+244934528102</b>
            </p> 
        `
            res = send(to,"Ativação da conta",link)
          return res
       break;
       case "reactivation":
        link=` Olá <b>${name}</b>,

             <p> Bem-vindo(a) à Resolva Angola! Estamos muito felizes em tê-lo(a) conosco. </p>
             
            <p> Para ativar sua conta, por favor, utilize o código de ativação abaixo.</p>
             
             <h2> Código de activação : <h2>${code}</h2></h2>
             
             <p> Por favor, insira este código na tela de ativação para concluir o processo de registro.</p>
             
            <p> Se você não solicitou este código, por favor, ignore este email ou entre em contato com o suporte ao cliente.</p>
             
             <p>
             <b> Atenciosamente,</b>  
             <b> Equipa de suporte do Resolva Angola</b>
             <b>resolvaangola@gmail.com </b>
             <b> Whatsapp:+244934528102</b>
             </p> 
    `
        res = send(to,"Ativação da conta",link)
      return res
   break;
        
    }

}

export { sendEmail }