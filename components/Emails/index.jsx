const emailTemp = (message) => {
	return `<!DOCTYPE html>
    <html>
    <head>
    <style type="text/css">
        
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap');
    * {
        margin: 0;
        border: 0;
        padding: 0;
    }
    body {
        font-family: 'Lato', sans-serif;
        background-color: #d8dbdb;
        font-size: 18px;
        max-width: 700px;
        margin: 0 auto;
        padding: 1%;
        color: #565859;
    }
    .wrapper {
        background: #fff;
        box-shadow: 0 0 10px #666;
        border-radius: 8px;
    }
    .social {
        width: 98%;
        text-align: center;
        list-style-type: none;
        padding: 1%;
        background-color: #666;
        border-radius: 8px 8px 0 0;
    }
    .social li {
        display: inline;
    }
    .social img {
        max-width: 32px;
        margin-right: 3px;
        margin-left: 3px;
    }
    img {
        max-width: 100%;
    }
    .logo {
        width: 100%;
        padding: 1% 0;
        text-align: center;
    }
    .logo img {
        max-width: 250px;
    }
    h1, h2 {
        letter-spacing: 1px;
        padding-bottom: 15px;
    }
    p {
        line-height: 28px;
        padding-bottom: 25px;
    }
    .button, .button-2 {
        background: #8570C7;
        color: #fff;
        text-decoration: none;
        font-weight: 600;
        padding: 10px 14px;
        border-radius: 8px;
        letter-spacing: 2px;
    }
    .button-2 {
        background: #3CA7D8;
    }
    .one-col {
        padding: 20px 0 40px;
        text-align: center;
    }
    .line {
        clear: both;
        height: 1px;
        background-color: #303840;
        margin: 15px auto 10px;
        width: 98%;
    }
    .three-col {
        margin: 10px 0 26px;
        float: left;
        width: 29.3%;
        padding: 5% 2%;
        text-align: center;
    }
    .three-col img {
        border-radius: 50%;
        max-width: 100px;
        padding-top: 2%;
    }
    .two-col {
        margin: 10px 0 26px;
        float: left;
        width: 100%;
        padding: 5% 2%;
    }
    .social {
        width: 100%;;
        text-align: center;
        list-style-type: none;
        padding: 2%;
        margin: 20px 0 5px;
    }
    .social li {
        display: inline;
    }
    .social img {
        max-width: 40px;
    }
    .contact {
        text-align: center;
        padding: 6%;
    }
    @media (max-width: 600px) {
        body {
            padding: 1%;
        }
        .three-col, .two-col {
            min-width: 96%;
            margin: 0 0 15px!important;
        }
    }
    
    </style>
    </head>
    <body>
    
        <div class="wrapper">
    
            <ul class="social">
                <li><a href="https://responsivehtmlemail.com/html-email-course/" target="_blank"><img src="img/facebook.png" alt=""></a></li>
                <li><a href="https://responsivehtmlemail.com/html-email-course/" target="_blank"><img src="img/twitter.png" alt=""></a></li> 
                <!-- <li><a href="https://responsivehtmlemail.com/html-email-course/" target="_blank"><img src="img/youtube.png" alt=""></a></li> -->
                <!-- <li><a href="https://responsivehtmlemail.com/html-email-course/" target="_blank"><img src="img/instagram.png" alt=""></a></li> -->
                <!-- <li><a href="https://responsivehtmlemail.com/html-email-course/" target="_blank"><img src="img/linkedin.png" alt=""></a></li> -->
            </ul>
    
            <div class="logo">
                <a href="https://responsivehtmlemail.com/html-email-course/" target="_blank"><img src="img/logo.png" alt=""></a>
            </div>	
    
            <div class="line"></div>
        
            <div class="two-col">
                <h2 style="text-align: center">Hello There</h2>
                <p> ${message}.</p>
            </div>
    
            <div class="line"></div>
    
            <p class="contact">
                <a href="https://simpleerent.com" target="_blank">www.simpleerent.com</a><br>
                +1 (613) 720-2190<br>
                support@simpleerent.com</p>
    
        </div> <!--- End Wrapper -->
    
    </body>
    </html>
    
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    `;
};

export default emailTemp;
