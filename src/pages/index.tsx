import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Grow,
  TextField,
  Typography
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Head from "next/head";
import ReCAPTCHA from "react-google-recaptcha";

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const formName = "bluebricks-contact";
const recaptchaSiteKey = "6Lf1O-0ZAAAAALCiOewjsk3xcT-wIkk6OY7bCHB5";

function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: theme.spacing(8),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2)
      }
    },
    logo: {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        height: "auto"
      }
    },
    socialBar: {
      marginTop: theme.spacing(6),
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(3)
      }
    },
    form: {
      width: 600,
      marginTop: theme.spacing(8),
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginTop: theme.spacing(3)
      }
    },
    formTextField: {
      marginTop: theme.spacing(2)
    },
    formBottom: {
      marginTop: theme.spacing(2),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column"
      }
    },
    formButtonContainer: {
      marginTop: theme.spacing(2),
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
    },
    formAlert: {
      marginTop: theme.spacing(4),
      width: "100%"
    }
  })
);

function IndexPage() {
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [recaptcha, setRacaptcha] = React.useState("");

  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [formAlert, setFormAlert] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitting(true);

    let alert = "";
    if (!email.trim() || !emailRegexp.test(email)) {
      alert = "Veuillez entrer une adresse e-mail valide";
    } else if (!message.trim()) {
      alert = "Veuillez entrer un message";
    } else if (!recaptcha) {
      alert = 'Veuillez cocher la case "Je ne suis pas un robot"';
    }

    setFormAlert(alert);
    if (alert) {
      setSubmitting(false);
      return;
    }

    await fetch("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": formName,
        email,
        message,
        "g-recaptcha-response": recaptcha
      })
    });

    setSubmitting(false);
    setSubmitted(true);
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Head>
        <title>
          Conseil et réalisation DevOps | Docker, Infrastructure as Code, CI/CD
          | Bluebricks.
        </title>
        <meta
          name="og:title"
          content="Bluebricks. Conseil et réalisation DevOps."
        />
        <meta name="og:url" content="https://bluebricks.dev/" />
        <meta
          name="og:image"
          content="https://bluebricks.dev/Bluebricks-og.png"
        />
        <meta
          name="description"
          content="J'interviens en tant qu'expert DevOps indépendant afin de mettre en place de manière itérative les meilleures conditions possibles pour vos équipes de développement 🚀"
        />
      </Head>

      <div className={classes.root}>
        <div>
          <img
            src="/Bluebricks-full-with-tagline.png"
            width={606}
            height={184}
            className={classes.logo}
            alt="Bluebricks logo"
          />
        </div>

        <div
          className={clsx(classes.socialBar, "addthis_inline_follow_toolbox")}
        >
          {" "}
        </div>

        <form
          className={classes.form}
          method="post"
          data-netlify="true"
          data-netlify-recaptcha="true"
          onSubmit={handleSubmit}
          name={formName}
        >
          <input type="hidden" name="form-name" value={formName} />
          <Typography>Un projet, une question ? Contactez-nous !</Typography>
          <TextField
            variant="outlined"
            className={classes.formTextField}
            placeholder="Votre adresse e-mail..."
            name="email"
            type="email"
            autoComplete="off"
            fullWidth
            disabled={submitting}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            className={classes.formTextField}
            placeholder="Votre message..."
            name="message"
            multiline
            fullWidth
            inputProps={{ rowsMin: 5 }}
            disabled={submitting}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <div className={classes.formBottom}>
            <ReCAPTCHA
              sitekey={recaptchaSiteKey}
              onChange={(value) => setRacaptcha(value)}
            />
            <div className={classes.formButtonContainer}>
              <Grow in={submitting}>
                <CircularProgress
                  color="secondary"
                  size={20}
                  style={{ marginRight: 10 }}
                />
              </Grow>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={submitting}
              >
                Envoyer
              </Button>
            </div>
          </div>

          <Grow in={formAlert !== "" || submitted}>
            <Alert
              className={classes.formAlert}
              onClose={() => {
                setSubmitted(false);
                setFormAlert("");
              }}
              severity={formAlert === "" && submitted ? "success" : "error"}
            >
              {formAlert || (submitted && "Message envoyé !")}
            </Alert>
          </Grow>
        </form>
      </div>
    </>
  );
}

export default IndexPage;
