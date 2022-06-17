import { computed, unref } from 'vue';
import { useLocalization } from '/@/hooks/abp/useLocalization';
import { useSettings } from '/@/hooks/abp/useSettings';
import { isDigit, isLetterOrDigit, isLower, isUpper } from '/@/utils/is';
import { getUnique } from '/@/utils/strings';

export function usePasswordValidator() {
  const { settingProvider } = useSettings();
  const { getNumber, isTrue } = settingProvider;
  const { L } = useLocalization('AbpIdentity');

  const passwordSetting = computed(() => {
    return {
      requiredLength: getNumber('Abp.Identity.Password.RequiredLength'),
      requiredUniqueChars: getNumber('Abp.Identity.Password.RequiredUniqueChars'),
      requiredDigit: isTrue('Abp.Identity.Password.RequireDigit'),
      requiredLowercase: isTrue('Abp.Identity.Password.RequireLowercase'),
      requireUppercase: isTrue('Abp.Identity.Password.RequireUppercase'),
      requireNonAlphanumeric: isTrue('Abp.Identity.Password.RequireNonAlphanumeric'),
    };
  });

  function validate(password: string): Promise<string> {
    const setting = unref(passwordSetting);
    if (setting.requiredLength > 0 && password.length < setting.requiredLength) {
      return Promise.reject(L('Volo.Abp.Identity:PasswordTooShort', [setting.requiredLength]));
    }
    if (setting.requireNonAlphanumeric && isLetterOrDigit(password)) {
      return Promise.reject(L('Volo.Abp.Identity:PasswordRequiresNonAlphanumeric'));
    }
    if (setting.requiredDigit && !isDigit(password)) {
      return Promise.reject(L('Volo.Abp.Identity:PasswordRequiresDigit'));
    }
    if (setting.requiredLowercase && !isLower(password)) {
      return Promise.reject(L('Volo.Abp.Identity:PasswordRequiresLower'));
    }
    if (setting.requireUppercase && !isUpper(password)) {
      return Promise.reject(L('Volo.Abp.Identity:PasswordRequiresUpper'));
    }
    if (setting.requiredUniqueChars >= 1 && getUnique(password).length < setting.requiredUniqueChars) {
      return Promise.reject(L('Volo.Abp.Identity:PasswordRequiredUniqueChars', [setting.requiredUniqueChars]));
    }
    return Promise.resolve('ok');
  }

  return {
    validate,
  };
}
