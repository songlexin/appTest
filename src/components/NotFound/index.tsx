import SvgIcon from '@/components/SvgIcon';

export default function NotFound() {
  return (
    <div style="width: 100%; display:flex;flex-direction: column;">
      <div style="width: 100%; text-align: center">
        <SvgIcon name="noData" style="width: 64px; height: 64px;" />
      </div>
      <div style="width: 100%; text-align: center;font-size: 16px; color: #ccc;margin-bottom:16px">
        无数据
      </div>
    </div>
  );
}
