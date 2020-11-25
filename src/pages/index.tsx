import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Grow,
  IconButton,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import Head from "next/head";

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
    formRecaptcha: {
      marginTop: theme.spacing(2)
    },
    formButtonContainer: {
      marginTop: theme.spacing(2),
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
    }
  })
);

function IndexPage() {
  const classes = useStyles();

  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  React.useEffect(() => {
    if (window.location.search.includes("submitted=1")) {
      setSubmitted(true);
    }
  }, []);

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
          content="https://bluebricks.dev/Bluebricks-full-with-tagline.png"
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
          action="/?submitted=1"
          method="post"
          data-netlify="true"
          data-netlify-recaptcha="true"
        >
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
          />
          <div data-netlify-recaptcha="true" className={classes.formRecaptcha}>
            {" "}
          </div>
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
              onClick={() => setSubmitting(true)}
            >
              Envoyer
            </Button>
          </div>
        </form>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={submitted}
          onClose={() => setSubmitted(false)}
          message="Message envoyé"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSubmitted(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </div>
    </>
  );
}

export default IndexPage;
