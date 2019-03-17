import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import pages from '../../scss/pages.module.scss';
import placeholders from '../../scss/placeholders.module.scss';
import fbIcon from '../../svgs/fbIcon';
import twitterIcon from '../../svgs/twitterIcon';
import './InvitePage.scss';

const APP_INVITE_URL = 'https://sgx.com/join';

class InvitePage extends Component {
  state = {
    userHasCopiedText: false,
  };

  onClickCopyInviteLink = (evt) => {
    evt.preventDefault();
    const { story } = this.props.location.state;
    this.copyTextToClipboard(`${APP_INVITE_URL}/${story.inviteCode}`);
  };

  fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        this.setState({ userHasCopiedText: true });
      }
    } catch (err) {}
    document.body.removeChild(textArea);
  };

  copyTextToClipboard = async (text) => {
    if (!navigator.clipboard) {
      this.fallbackCopyTextToClipboard(text);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      this.setState({ userHasCopiedText: true });
    } catch (error) {}
  };

  onClickSocialLink = (evt) => {
    evt.preventDefault();
    window.open(
      evt.target.href,
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=480',
    );
  };

  render() {
    if (!this.props.location.state || !this.props.location.state.story) {
      return <Redirect to="/" />;
    }

    const { story } = this.props.location.state;
    const { userHasCopiedText } = this.state;

    const link = `${APP_INVITE_URL}/${story.inviteCode}`;

    const shareText = encodeURIComponent(
      `Join me write a story, "${story.title}"`,
    );
    const shareLink = encodeURIComponent(link);
    const tweetLink = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareLink}`;
    const fbLink = `https://facebook.com/sharer/sharer.php?u=${shareLink}&t=${shareText}`;

    return (
      <div className={`${pages.Page} ${pages.BluePage}`}>
        <div className={pages.Body}>
          <div className={pages.CenterCard}>
            <div className={pages.CenterCardBody}>
              <div className="Invite">
                <div className={placeholders.Banner} />
                <div className="Invite__message">
                  You're almost ready!
                  <br />
                  Share this link to invite your friend.
                </div>
                <div className="Invite__link">
                  <div>{link}</div>
                  <button onClick={this.onClickCopyInviteLink}>
                    {userHasCopiedText ? <i>Copied!</i> : 'Copy'}
                  </button>
                </div>
                <div className="Invite__social">
                  <div className="Invite__social__wrapper">
                    <div className="Invite__social__section">
                      <a
                        className="Invite__social__button Invite__social__button--twitter"
                        href={tweetLink}
                        target="__blank"
                        onClick={this.onClickSocialLink}
                      >
                        {twitterIcon()}
                        <span>Share on Twitter</span>
                      </a>
                    </div>
                    <div className="Invite__social__section">
                      <a
                        className="Invite__social__button Invite__social__button--facebook"
                        href={fbLink}
                        target="__blank"
                        onClick={this.onClickSocialLink}
                      >
                        {fbIcon()}
                        <span>Share on Facebook</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InvitePage;
