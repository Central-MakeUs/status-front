import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { signUp } from '@/api/users';
import { TextInput } from '@/components/ui/TextInput/TextInput';
import { Button } from '@/components/ui/Button/Button';
import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import { nicknameSchema } from '@/schemas/authScheme';
import { NICKNAME_MAX_LENGTH, SIGN_UP_STEP } from '@/constants/auth';
import { SIGN_UP_STEP_INFO } from '@/constants/auth';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { renderWithLineBreaks } from '@/utils/format';
import { TERM_URL } from '@/constants/term';

import type { SignUpStep } from '@/types/auth';
import type { SignUpForm } from '@/types/users';

import IconLogo from '@/assets/icons/icon-logo-default.svg?react';
import IconChevronRight from '@/assets/icons/icon-chevron-right.svg?react';

import classNames from 'classnames/bind';
import styles from './SignUpPage.module.scss';
import { MESSAGE_TYPES } from '@/constants/webView';

const cx = classNames.bind(styles);

const SignUpPage = () => {
  const navigate = useNavigate();
  const { pendingSocialUser, setPendingSocialUser, setUser } = useAuthStore(
    useShallow((state) => ({
      pendingSocialUser: state.pendingSocialUser,
      setPendingSocialUser: state.setPendingSocialUser,
      setUser: state.setUser,
    }))
  );

  const [step, setStep] = useState<SignUpStep>(SIGN_UP_STEP.NICKNAME);
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState<string | undefined>(
    undefined
  );

  const [ageAgreed, setAgeAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState(false);

  const isNicknameValid = nickname.length > 0 && nicknameError === undefined;
  const isTermsAndPrivacyPolicyValid =
    ageAgreed && termsAgreed && privacyPolicyAgreed;

  const { title, description } = SIGN_UP_STEP_INFO[step];

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;

    if (nickname.length > NICKNAME_MAX_LENGTH) {
      return;
    }

    const result = nicknameSchema.safeParse({ nickname });
    setNickname(nickname);

    if (result.success) {
      setNicknameError(undefined);
    } else {
      setNicknameError(result.error.issues[0].message);
    }
  };

  const handleChangeAgeAgreed = () => {
    setAgeAgreed((ageAgreed) => !ageAgreed);
  };

  const handleChangeTermsAgreed = () => {
    setTermsAgreed((termsAgreed) => !termsAgreed);
  };

  const handleChangePrivacyPolicyAgreed = () => {
    setPrivacyPolicyAgreed((privacyPolicyAgreed) => !privacyPolicyAgreed);
  };

  const handleChangeTermsAndPrivacyPolicyAgreed = () => {
    if (isTermsAndPrivacyPolicyValid) {
      setAgeAgreed(false);
      setTermsAgreed(false);
      setPrivacyPolicyAgreed(false);

      return;
    }

    setAgeAgreed(true);
    setTermsAgreed(true);
    setPrivacyPolicyAgreed(true);
  };

  const handleClickTermsLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const { href } = event.currentTarget;

    const isWebView = window.ReactNativeWebView !== undefined;
    if (isWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: MESSAGE_TYPES.OPEN_EXTERNAL_BROWSER,
          url: href,
        })
      );
    } else {
      window.open(href, '_blank');
    }
  };

  const handleClickNicknameConfirmButton = () => {
    setStep(SIGN_UP_STEP.TERMS_AND_PRIVACY_POLICY);
  };

  const handleClickTermsAndPrivacyPolicyConfirmButton = async () => {
    if (!isTermsAndPrivacyPolicyValid) {
      return;
    }

    if (!pendingSocialUser) {
      return;
    }

    const payload: SignUpForm = {
      nickname,
      provider: pendingSocialUser,
    };

    const response = await signUp(payload);

    if (!response?.data) {
      return;
    }

    console.log('register');
    setUser(response.data);
    setPendingSocialUser(null);
    navigate(PAGE_PATHS.TUTORIAL);
  };

  return (
    <>
      <main className="main">
        <div className={cx('sign-up-container')}>
          <h2 className="sr-only">회원가입</h2>
          <h3 className="sr-only">닉네임 설정</h3>

          <div className={cx('sign-up-title')}>
            <IconLogo className={cx('icon-logo')} aria-hidden={true} />
            <strong className={cx('text')}>
              {renderWithLineBreaks(title)}
            </strong>
          </div>
          <p className={cx('sign-up-description')}>{description}</p>
          {step === SIGN_UP_STEP.NICKNAME ? (
            <TextInput
              className={cx('nickname-input')}
              label="닉네임 (최대 10자)"
              placeholder="한글, 영문, 숫자 조합으로 입력해주세요."
              value={nickname}
              maxLength={NICKNAME_MAX_LENGTH}
              onChange={handleChangeNickname}
              errorMessage={nicknameError}
            />
          ) : (
            <div className={cx('terms')}>
              <div className={cx('terms-check-all-wrapper')}>
                <Checkbox
                  checked={isTermsAndPrivacyPolicyValid}
                  onClick={handleChangeTermsAndPrivacyPolicyAgreed}
                  className={cx('terms-check-all')}
                >
                  <Checkbox.Label className={cx('terms-check-all-label')}>
                    약관 전체동의
                  </Checkbox.Label>
                </Checkbox>
              </div>
              <ul className={cx('terms-list')}>
                <li className={cx('terms-item')}>
                  <Checkbox
                    checked={ageAgreed}
                    onClick={handleChangeAgeAgreed}
                    className={cx('terms-item-checkbox')}
                    required
                  >
                    <Checkbox.Label className={cx('terms-item-label')}>
                      만 14세 이상 확인 (필수)
                    </Checkbox.Label>
                  </Checkbox>
                </li>
                <li className={cx('terms-item')}>
                  <Checkbox
                    checked={termsAgreed}
                    onClick={handleChangeTermsAgreed}
                    className={cx('terms-item-checkbox')}
                    required
                  >
                    <Checkbox.Label className={cx('terms-item-label')}>
                      서비스 이용 약관 (필수)
                    </Checkbox.Label>
                  </Checkbox>
                  <a
                    href={TERM_URL.TERMS_OF_SERVICE}
                    rel="noopener noreferrer"
                    target="_blank"
                    className={cx('terms-item-link')}
                    aria-label="약관 보기"
                    onClick={handleClickTermsLink}
                  >
                    <IconChevronRight
                      className={cx('icon-chevron')}
                      aria-hidden={true}
                    />
                  </a>
                </li>
                <li className={cx('terms-item')}>
                  <Checkbox
                    checked={privacyPolicyAgreed}
                    onClick={handleChangePrivacyPolicyAgreed}
                    className={cx('terms-item-checkbox')}
                    required
                  >
                    <Checkbox.Label className={cx('terms-item-label')}>
                      개인정보 수집 및 이용 약관 (필수)
                    </Checkbox.Label>
                  </Checkbox>
                  <a
                    href={TERM_URL.PRIVACY_POLICY}
                    rel="noopener noreferrer"
                    target="_blank"
                    className={cx('terms-item-link')}
                    aria-label="약관 보기"
                    onClick={handleClickTermsLink}
                  >
                    <IconChevronRight
                      className={cx('icon-chevron')}
                      aria-hidden={true}
                    />
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </main>
      <footer className={cx('sign-up-footer')}>
        <Button
          variant="secondary"
          disabled={
            step === SIGN_UP_STEP.NICKNAME
              ? !isNicknameValid
              : !isTermsAndPrivacyPolicyValid
          }
          onClick={
            step === SIGN_UP_STEP.NICKNAME
              ? handleClickNicknameConfirmButton
              : handleClickTermsAndPrivacyPolicyConfirmButton
          }
        >
          확인
        </Button>
      </footer>
    </>
  );
};

export default SignUpPage;
