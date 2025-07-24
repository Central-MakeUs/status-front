import { useState } from 'react';
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

import type { SignUpStep } from '@/types/auth';
import type { SignUpForm } from '@/api/types/users';

import IconLogo from '@/assets/icons/icon-logo-default.svg?react';
import IconChevronRight from '@/assets/icons/icon-chevron-right.svg?react';

import classNames from 'classnames/bind';
import styles from './SignUpPage.module.scss';

const cx = classNames.bind(styles);

const SignUpPage = () => {
  const navigate = useNavigate();
  const { pendingSocialUser } = useAuthStore();

  // [TODO] 소셜 로그인 한 상태인지 체크 후 소셜 로그인 한 상태라면 회원가입 페이지 대신 소셜 로그인 페이지로 이동

  const [step, setStep] = useState<SignUpStep>(SIGN_UP_STEP.NICKNAME);
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState<string | undefined>(
    undefined
  );
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState(false);

  const isNicknameValid = nickname.length > 0 && nicknameError === undefined;
  const isTermsAndPrivacyPolicyValid = termsAgreed && privacyPolicyAgreed;

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

  const handleChangeTermsAgreed = () => {
    setTermsAgreed((termsAgreed) => !termsAgreed);
  };

  const handleChangePrivacyPolicyAgreed = () => {
    setPrivacyPolicyAgreed((privacyPolicyAgreed) => !privacyPolicyAgreed);
  };

  const handleChangeTermsAndPrivacyPolicyAgreed = () => {
    if (isTermsAndPrivacyPolicyValid) {
      setTermsAgreed(false);
      setPrivacyPolicyAgreed(false);

      return;
    }

    setTermsAgreed(true);
    setPrivacyPolicyAgreed(true);
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
    // [TODO] authStore 초기화, user 정보 업데이트
    console.log(response);
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
                    checked={termsAgreed}
                    onClick={handleChangeTermsAgreed}
                    className={cx('terms-item-checkbox')}
                    required
                  >
                    <Checkbox.Label className={cx('terms-item-label')}>
                      서비스 이용 약관 (필수)
                    </Checkbox.Label>
                  </Checkbox>
                  {/* [TODO] 약관 URL 추가 */}
                  <a
                    href="#"
                    rel="noopener noreferrer"
                    target="_blank"
                    className={cx('terms-item-link')}
                    aria-label="약관 보기"
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
                  {/* [TODO] 약관 URL 추가 */}
                  <a
                    href="#"
                    rel="noopener noreferrer"
                    target="_blank"
                    className={cx('terms-item-link')}
                    aria-label="약관 보기"
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
