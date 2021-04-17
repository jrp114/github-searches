import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { UserCardProps } from "./Users.entity";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: '5px 5px 15px black'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(4, 4, 4),
      marginRight: "10%",
      marginLeft: "10%",
      maxWidth: "35%",
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
  })
);

const UserCard: React.FC<UserCardProps> = (props) => {
  const classes = useStyles();
  const { user, setShowModal, showModal } = props;

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={showModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={setShowModal}>
          <Paper className={classes.paper}>
            <div>
              {user?.avatar_url ? (
                <img
                  style={{ width: 250, height: 250 }}
                  src={user?.avatar_url}
                />
              ) : null}
              <Typography gutterBottom variant="h2">
                {user.login}
              </Typography>
              {user?.company ? (
                <div>
                  <Typography gutterBottom variant="h4">
                    Company
                  </Typography>{" "}
                  <Typography gutterBottom variant="h5">
                    {user.company}
                  </Typography>
                  <br />
                </div>
              ) : null}
              {user?.bio ? (
                <div>
                  <Typography gutterBottom variant="h4">
                    Bio
                  </Typography>
                  <Typography gutterBottom variant="h5">
                    {user.bio}
                  </Typography>
                  <br />
                </div>
              ) : null}
              {user?.blog &&
              /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
                user?.blog
              ) ? (
                <Typography gutterBottom variant="subtitle1">
                  <a href={user.blog} target="_blank">{user?.login}'s blog</a>
                </Typography>
              ) : null}
              {user?.html_url &&
              /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
                user?.html_url
              ) ? (
                <Typography gutterBottom variant="subtitle1">
                  <a href={user.html_url} target="_blank">{user?.login}'s GitHub page</a>
                </Typography>
              ) : null}
              {user?.followers ? (
                <Typography gutterBottom variant="subtitle1">
                  Followers: {user?.followers}
                </Typography>
              ) : null}
              {user?.following ? (
                <Typography gutterBottom variant="subtitle1">
                  Following: {user?.following}
                </Typography>
              ) : null}
            </div>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default UserCard;
