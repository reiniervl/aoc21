import java.util.List;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Fish {
	public static void main(String[] args) {
		
		List<Integer> data = Stream.of("3,4,3,1,2,1,5,1,1,1,1,4,1,2,1,1,2,1,1,1,3,4,4,4,1,3,2,1,3,4,1,1,3,4,2,5,5,3,3,3,5,1,4,1,2,3,1,1,1,4,1,4,1,5,3,3,1,4,1,5,1,2,2,1,1,5,5,2,5,1,1,1,1,3,1,4,1,1,1,4,1,1,1,5,2,3,5,3,4,1,1,1,1,1,2,2,1,1,1,1,1,1,5,5,1,3,3,1,2,1,3,1,5,1,1,4,1,1,2,4,1,5,1,1,3,3,3,4,2,4,1,1,5,1,1,1,1,4,4,1,1,1,3,1,1,2,1,3,1,1,1,1,5,3,3,2,2,1,4,3,3,2,1,3,3,1,2,5,1,3,5,2,2,1,1,1,1,5,1,2,1,1,3,5,4,2,3,1,1,1,4,1,3,2,1,5,4,5,1,4,5,1,3,3,5,1,2,1,1,3,3,1,5,3,1,1,1,3,2,5,5,1,1,4,2,1,2,1,1,5,5,1,4,1,1,3,1,5,2,5,3,1,5,2,2,1,1,5,1,5,1,2,1,3,1,1,1,2,3,2,1,4,1,1,1,1,5,4,1,4,5,1,4,3,4,1,1,1,1,2,5,4,1,1,3,1,2,1,1,2,1,1,1,2,1,1,1,1,1,4".split(",")).map(Integer::parseInt).collect(Collectors.toList());
		BigDecimal[] fish = new BigDecimal[9];
		for(int i = 0; i < 9; i++) fish[i] = new BigDecimal(0);
		data.forEach(v -> fish[v] = fish[v].add(new BigDecimal(1)));
		System.out.println(Arrays.toString(fish));

		for (int r = 0; r < 256; r++) {
			BigDecimal zero = fish[0];
			for (int i = 0; i < 8; i++) {
				fish[i] = fish[i + 1];
			}
			fish[6] = fish[6].add(zero);
			fish[8] = zero;
			System.out.println("r " + r + ": " + Arrays.toString(fish));
		}
		System.out.println(Arrays.toString(fish));
		BigDecimal sum = new BigDecimal(0);
		for(BigDecimal f : fish) {
			sum = sum.add(f);
		}
		System.out.println(sum);
	}
}
