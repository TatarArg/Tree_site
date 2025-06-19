import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

type tSeries = {
  'Максимальная высота': boolean;
  'Средняя высота': boolean;
  'Минимальная высота': boolean;
};

type CheckboxProps = {
  series: tSeries;
  setSeries: React.Dispatch<React.SetStateAction<tSeries>>;
};

function SettingChart({ series, setSeries }: CheckboxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeries({
      ...series,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <FormControl sx={{}}>
      <FormLabel>На диаграмме показать:</FormLabel>
      <FormControlLabel
        control={
          <Checkbox
            checked={series["Максимальная высота"]}
            onChange={handleChange}
            name="Максимальная высота"
          />
        }
        label="максимальную высоту"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={series["Средняя высота"]}
            onChange={handleChange}
            name="Средняя высота"
          />
        }
        label="среднюю высоту"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={series["Минимальная высота"]}
            onChange={handleChange}
            name="Минимальная высота"
          />
        }
        label="минимальную высоту"
      />
    </FormControl>
  );
}

export default SettingChart